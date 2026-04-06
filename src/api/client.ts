import axios, {
  AxiosError,
  type AxiosAdapter,
  type AxiosResponse,
} from 'axios';
import type { ApiResponse, RequestConfig } from '../types/api';
import { mockRoutes, MOCK_API_DELAY_MS } from './mock/routes';

const USE_MOCK = true;
const API_BASE_URL = USE_MOCK ? '/mock-api' : 'https://api.example.com';
const API_TIMEOUT_MS = 8000;
const API_RETRY_COUNT = 2;
const API_RETRY_BASE_DELAY_MS = 300;

type ApiClientErrorCode =
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'UNKNOWN_ERROR';

type ErrorResponse = ApiResponse<null>;

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startedAt: number;
    };
  }
}

export class ApiClientError extends Error {
  status: number | null;
  code: ApiClientErrorCode;
  response?: ErrorResponse;
  retryable: boolean;

  constructor({
    message,
    status,
    code,
    response,
    retryable,
  }: {
    message: string;
    status: number | null;
    code: ApiClientErrorCode;
    response?: ErrorResponse;
    retryable: boolean;
  }) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.response = response;
    this.retryable = retryable;
  }
}

function wait(delayMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), delayMs);
  });
}

function getBackoffDelay(baseDelayMs: number, attempt: number) {
  return baseDelayMs * 2 ** attempt;
}

function toErrorResponse<T>(
  response: ApiResponse<T> | undefined,
  fallbackMessage: string,
): ErrorResponse {
  return {
    success: false,
    data: null,
    message: response?.message ?? fallbackMessage,
    error: response?.error ?? response?.message ?? fallbackMessage,
  };
}

export function resolveApiUrl(baseURL?: string, url?: string) {
  const normalizedBase = (baseURL ?? '').replace(/\/$/, '');
  const normalizedPath = `/${(url ?? '').replace(/^\//, '')}`.replace(/\/$/, '');

  return `${normalizedBase}${normalizedPath}`;
}

const mockApiAdapter: AxiosAdapter = async (config) => {
  const route = resolveApiUrl(config.baseURL, config.url);
  const handler = mockRoutes[route];

  await wait(MOCK_API_DELAY_MS);

  if (!handler) {
    const response: AxiosResponse = {
      data: {
        success: false,
        data: null,
        message: `No mock handler registered for ${route}`,
        error: 'Bad request',
      },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config,
      request: null,
    };

    throw new AxiosError(
      `Mock route not found: ${route}`,
      AxiosError.ERR_BAD_REQUEST,
      config,
      null,
      response,
    );
  }

  const result = handler(config, route);
  const response: AxiosResponse = {
    data: result.body,
    status: result.status,
    statusText: result.status === 200 ? 'OK' : 'Mock Error',
    headers: {
      'Content-Type': 'application/json',
    },
    config,
    request: null,
  };

  if (result.status >= 400) {
    throw new AxiosError(
      result.body.error ?? result.body.message ?? 'Mock request failed.',
      result.status === 400 || result.status === 401
        ? AxiosError.ERR_BAD_REQUEST
        : AxiosError.ERR_BAD_RESPONSE,
      config,
      null,
      response,
    );
  }

  return response;
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  adapter: USE_MOCK ? mockApiAdapter : undefined,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  config.metadata = {
    startedAt: Date.now(),
  };

  if (__DEV__) {
    const method = config.method?.toUpperCase() ?? 'GET';
    console.info(`[api] ${method} ${resolveApiUrl(config.baseURL, config.url)}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      const method = response.config.method?.toUpperCase() ?? 'GET';
      const duration =
        Date.now() - (response.config.metadata?.startedAt ?? Date.now());

      console.info(
        `[api] ${response.status} ${method} ${resolveApiUrl(response.config.baseURL, response.config.url)} (${duration}ms)`,
      );
    }

    return response;
  },
  (error) => {
    if (__DEV__) {
      const method = error.config?.method?.toUpperCase() ?? 'GET';
      const route = resolveApiUrl(error.config?.baseURL, error.config?.url);
      const duration =
        Date.now() - (error.config?.metadata?.startedAt ?? Date.now());
      const status = error.response?.status ?? 'ERR';

      console.warn(`[api] ${status} ${method} ${route} (${duration}ms)`);
    }

    return Promise.reject(error);
  },
);

export function normalizeApiError(
  error: unknown,
  fallbackMessage = 'Something went wrong. Please try again.',
): ApiClientError {
  if (error instanceof ApiClientError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null;
    const code: ApiClientErrorCode =
      error.code === 'ECONNABORTED'
        ? 'TIMEOUT_ERROR'
        : status === null
          ? 'NETWORK_ERROR'
          : 'API_ERROR';
    const response = toErrorResponse(error.response?.data, fallbackMessage);
    const message = response.error ?? error.message ?? fallbackMessage;

    return new ApiClientError({
      message,
      status,
      code,
      response,
      retryable: status === null || status >= 500,
    });
  }

  if (error instanceof Error) {
    return new ApiClientError({
      message: error.message,
      status: null,
      code: 'UNKNOWN_ERROR',
      retryable: false,
    });
  }

  return new ApiClientError({
    message: fallbackMessage,
    status: null,
    code: 'UNKNOWN_ERROR',
    retryable: false,
  });
}

export function getApiErrorMessage(
  error: unknown,
  fallbackMessage = 'Something went wrong. Please try again.',
) {
  return normalizeApiError(error, fallbackMessage).message;
}

export async function request<T>({
  url,
  method = 'GET',
  params,
  data,
  retryCount = API_RETRY_COUNT,
  retryDelayMs = API_RETRY_BASE_DELAY_MS,
}: RequestConfig): Promise<ApiResponse<T>> {
  let attempt = 0;

  while (attempt <= retryCount) {
    try {
      const response = await apiClient.request<ApiResponse<T>>({
        url,
        method,
        params,
        data,
      });

      if (!response.data.success) {
        throw new ApiClientError({
          message:
            response.data.error ??
            response.data.message ??
            'Request completed with errors.',
          status: response.status,
          code: 'API_ERROR',
          response: toErrorResponse(response.data, 'Request completed with errors.'),
          retryable: response.status >= 500,
        });
      }

      return response.data;
    } catch (error) {
      const normalizedError = normalizeApiError(error);

      if (attempt >= retryCount || !normalizedError.retryable) {
        throw normalizedError;
      }

      if (__DEV__) {
        console.info(
          `[api] retry ${attempt + 1}/${retryCount} ${method} ${url} after ${normalizedError.message}`,
        );
      }

      await wait(getBackoffDelay(retryDelayMs, attempt));
      attempt += 1;
    }
  }

  throw new ApiClientError({
    message: 'Request failed after exhausting retries.',
    status: null,
    code: 'UNKNOWN_ERROR',
    retryable: false,
  });
}

import axios, { AxiosError, type AxiosAdapter, type AxiosResponse } from 'axios';
import { API_BASE_URL, API_TIMEOUT_MS, USE_MOCK } from './config';
import { MOCK_API_DELAY_MS, mockRoutes } from '../mock/routes';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startedAt: number;
    };
  }
}

function wait(delayMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), delayMs);
  });
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
      const duration = Date.now() - (response.config.metadata?.startedAt ?? Date.now());
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
      const duration = Date.now() - (error.config?.metadata?.startedAt ?? Date.now());
      const status = error.response?.status ?? 'ERR';
      console.warn(`[api] ${status} ${method} ${route} (${duration}ms)`);
    }

    return Promise.reject(error);
  },
);

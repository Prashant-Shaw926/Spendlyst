import axios from 'axios';
import type { ApiResponse, RequestConfig } from '../../types/api';
import { API_RETRY_BASE_DELAY_MS, API_RETRY_COUNT } from './config';
import { apiClient } from './client';

type ApiClientErrorCode =
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'TIMEOUT_ERROR'
  | 'UNKNOWN_ERROR';

type ErrorResponse = ApiResponse<null>;

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
            response.data.error ?? response.data.message ?? 'Request completed with errors.',
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

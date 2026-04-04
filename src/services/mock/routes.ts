import type { InternalAxiosRequestConfig } from 'axios';
import home from './home.json';
import insights from './insights.json';
import transactions from './transactions.json';
import type {
  ApiResponse,
  HomeData,
  InsightsData,
  TransactionsData,
} from '../../types/api';

type MockStatusCode = 200 | 400 | 401 | 500;

export type MockRouteHandler = (
  config: InternalAxiosRequestConfig,
  route: string,
) => {
  status: MockStatusCode;
  body: ApiResponse<unknown>;
};

export const MOCK_API_DELAY_MS = 450;

function getSimulatedStatus(config: InternalAxiosRequestConfig): MockStatusCode {
  const params = (config.params ?? {}) as Record<string, unknown>;
  const rawStatus = Number(params.__mockStatus);

  if (rawStatus === 400 || rawStatus === 401 || rawStatus === 500) {
    return rawStatus;
  }

  return 200;
}

function buildErrorBody(status: Exclude<MockStatusCode, 200>, route: string): ApiResponse<null> {
  switch (status) {
    case 400:
      return {
        success: false,
        data: null,
        message: `Bad request for ${route}.`,
        error: 'Bad request',
      };
    case 401:
      return {
        success: false,
        data: null,
        message: 'Your session has expired. Please sign in again.',
        error: 'Unauthorized',
      };
    case 500:
    default:
      return {
        success: false,
        data: null,
        message: 'The server could not process your request right now.',
        error: 'Server error',
      };
  }
}

function createRouteHandler<T>(payload: ApiResponse<T>): MockRouteHandler {
  return (config, route) => {
    const status = getSimulatedStatus(config);

    if (status !== 200) {
      return {
        status,
        body: buildErrorBody(status, route),
      };
    }

    return {
      status: 200,
      body: payload,
    };
  };
}

export const mockRoutes: Record<string, MockRouteHandler> = {
  '/mock-api/home': createRouteHandler(home as ApiResponse<HomeData>),
  '/mock-api/transactions': createRouteHandler(
    transactions as ApiResponse<TransactionsData>,
  ),
  '/mock-api/insights': createRouteHandler(insights as ApiResponse<InsightsData>),
};

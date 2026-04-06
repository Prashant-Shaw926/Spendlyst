import type { TransactionsData } from '../../types/api';
import { request } from '../client';

export function getTransactions(params?: Record<string, unknown>) {
  return request<TransactionsData>({
    url: '/transactions',
    params,
  });
}

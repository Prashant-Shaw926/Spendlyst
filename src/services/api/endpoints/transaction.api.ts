import type { TransactionsData } from '../../../types/api';
import { request } from '../request';

export function getTransactions() {
  return request<TransactionsData>({
    url: '/transactions',
  });
}

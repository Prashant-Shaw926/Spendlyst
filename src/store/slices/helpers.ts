import { CACHE_TTL_MS } from '../../services/api/config';
import type { RequestStatus, TransactionModel } from '../../types/models';

export function isCacheStale(lastFetchedAt: number | null) {
  return lastFetchedAt === null || Date.now() - lastFetchedAt > CACHE_TTL_MS;
}

export function getFetchStatus(hasCachedData: boolean): RequestStatus {
  return hasCachedData ? 'refreshing' : 'loading';
}

export function mergeUniqueIds(currentIds: string[], incomingIds: string[]) {
  return Array.from(new Set([...currentIds, ...incomingIds]));
}

export function upsertTransactionsById(
  currentTransactionsById: Record<string, TransactionModel>,
  transactions: TransactionModel[],
) {
  return transactions.reduce<Record<string, TransactionModel>>((accumulator, transaction) => {
    accumulator[transaction.id] = transaction;
    return accumulator;
  }, { ...currentTransactionsById });
}

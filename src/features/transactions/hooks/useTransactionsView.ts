import { useEffect, useMemo, useState } from 'react';
import { transactionCategorySuggestions } from '../../../constants/finance';
import {
  buildTransactionCollections,
  mapTransactionsToSections,
} from '../../../api/mappers/finance';
import {
  selectAllTransactions,
  selectFetchTransactions,
  selectHasHydrated,
  selectHasInitializedData,
  selectInitializeAppData,
  selectLastGlobalError,
  selectTransactionCategories,
  selectTransactionOverview,
  selectTransactionsStatus,
  useAppStore,
} from '../../../store';

export type TypeFilter = 'All' | 'Income' | 'Expense';

export const typeFilters: readonly TypeFilter[] = ['All', 'Income', 'Expense'];

export function useTransactionsView() {
  const hasHydrated = useAppStore(selectHasHydrated);
  const hasInitializedData = useAppStore(selectHasInitializedData);
  const fetchTransactions = useAppStore(selectFetchTransactions);
  const initializeAppData = useAppStore(selectInitializeAppData);
  const lastGlobalError = useAppStore(selectLastGlobalError);
  const transactions = useAppStore(selectAllTransactions);
  const transactionOverview = useAppStore(selectTransactionOverview);
  const dynamicCategories = useAppStore(selectTransactionCategories);
  const transactionsStatus = useAppStore(selectTransactionsStatus);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    if (hasHydrated) {
      initializeAppData();
    }
  }, [hasHydrated, initializeAppData]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(['All', ...dynamicCategories, ...transactionCategorySuggestions]),
    );
  }, [dynamicCategories]);

  const filteredTransactions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return transactions.filter((transaction) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        transaction.title.toLowerCase().includes(normalizedQuery) ||
        transaction.category.toLowerCase().includes(normalizedQuery) ||
        transaction.notes.toLowerCase().includes(normalizedQuery);
      const matchesType =
        typeFilter === 'All' || transaction.type === typeFilter.toLowerCase();
      const matchesCategory =
        categoryFilter === 'All' ||
        transaction.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchesQuery && matchesType && matchesCategory;
    });
  }, [categoryFilter, searchQuery, transactions, typeFilter]);

  const filteredSections = useMemo(() => {
    const filteredCollections = buildTransactionCollections(filteredTransactions);

    return mapTransactionsToSections(
      filteredCollections.transactionMonthIds,
      filteredCollections.transactionIdsByMonth,
      filteredCollections.transactionsById,
    );
  }, [filteredTransactions]);

  return {
    categories,
    categoryFilter,
    fetchTransactions,
    filteredSections,
    hasLoadError:
      transactionsStatus === 'error' &&
      transactions.length === 0 &&
      lastGlobalError?.source === 'api',
    hasHydrated,
    hasInitializedData,
    initializeAppData,
    searchQuery,
    setCategoryFilter,
    setSearchQuery,
    setTypeFilter,
    transactionOverview,
    typeFilter,
    transactions,
  };
}

export default useTransactionsView;

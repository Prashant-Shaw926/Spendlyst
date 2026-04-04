# API Setup Documentation

This project uses a small, centralized API layer built around axios, zustand, and MMKV.
The goal is to keep request logic, error handling, caching, and persistence out of screens
and inside a predictable data flow.

## Stack Overview

- axios is the HTTP client used for all API requests.
- zustand is the global store that holds remote data, loading states, and UI error state.
- MMKV is the local storage engine used by zustand persistence.

The main files are:

- [src/services/api/client.ts](../src/services/api/client.ts)
- [src/services/api/request.ts](../src/services/api/request.ts)
- [src/services/api/endpoints/home.api.ts](../src/services/api/endpoints/home.api.ts)
- [src/services/api/endpoints/transaction.api.ts](../src/services/api/endpoints/transaction.api.ts)
- [src/services/api/endpoints/insights.api.ts](../src/services/api/endpoints/insights.api.ts)
- [src/store/useAppStore.ts](../src/store/useAppStore.ts)
- [src/store/storage.ts](../src/store/storage.ts)
- [src/store/slices/home.slice.ts](../src/store/slices/home.slice.ts)
- [src/store/slices/transaction.slice.ts](../src/store/slices/transaction.slice.ts)
- [src/store/slices/insights.slice.ts](../src/store/slices/insights.slice.ts)
- [src/screens/Home/HomeScreen.tsx](../src/screens/Home/HomeScreen.tsx)
- [src/screens/Transactions/TransactionsScreen.tsx](../src/screens/Transactions/TransactionsScreen.tsx)
- [src/screens/Insights/InsightsScreen.tsx](../src/screens/Insights/InsightsScreen.tsx)

## Request Flow

The request flow is the same for Home, Transactions, and Insights:

1. A screen calls a store action such as `fetchHome`, `fetchTransactions`, or `fetchInsights`.
2. The slice checks whether data already exists, whether a request is already in flight, and whether cached data is stale.
3. The slice calls a thin endpoint wrapper, for example `getHome()` or `getTransactions()`.
4. The endpoint wrapper calls the shared `request()` function.
5. `request()` sends the request through the shared axios client.
6. The response is normalized, mapped into app models, and written back to zustand state.

This keeps screens simple and makes the API behavior consistent across the app.

## Axios Client

The shared client lives in [src/services/api/client.ts](../src/services/api/client.ts).

It is configured with:

- `baseURL` from [src/services/api/config.ts](../src/services/api/config.ts)
- `timeout` set to 8000 ms
- JSON content headers
- a mock adapter when `USE_MOCK` is enabled

The client also has request and response interceptors:

- request interceptor stores a `startedAt` timestamp on the request config
- request interceptor logs the route in development builds
- response interceptor logs the status code and request duration in development builds
- error interceptor logs failed requests with timing information

### Mock mode

`USE_MOCK` is currently `true` in [src/services/api/config.ts](../src/services/api/config.ts).
That means requests are routed to the mock adapter instead of a real backend.

The mock adapter:

- resolves the request route using the same URL logic as the real client
- waits for `MOCK_API_DELAY_MS`
- looks up the route in [src/services/mock/routes.ts](../src/services/mock/routes.ts)
- returns JSON fixtures from `src/services/mock/home.json`, `transactions.json`, and `insights.json`

If no mock handler exists, the adapter throws an axios error with a 400 response.

## Shared Request Wrapper

The core request logic lives in [src/services/api/request.ts](../src/services/api/request.ts).

This file is responsible for:

- calling `apiClient.request()`
- retrying failed requests when the error is retryable
- normalizing axios errors into a single app error type
- converting API responses into a consistent success/failure contract

### Retry behavior

Requests retry automatically using exponential backoff:

- default retry count comes from `API_RETRY_COUNT`
- default base delay comes from `API_RETRY_BASE_DELAY_MS`
- retries are only attempted for retryable failures, such as network issues or 5xx responses

### Error normalization

`normalizeApiError()` converts different error shapes into `ApiClientError`.
This gives the store and the UI a stable error structure with:

- `status`
- `code`
- `message`
- `retryable`

`handleGlobalError()` in [src/services/errors/handler.ts](../src/services/errors/handler.ts) uses the normalized error to populate the store-level global error state.

## Endpoint Layer

Each endpoint file is intentionally small:

- [src/services/api/endpoints/home.api.ts](../src/services/api/endpoints/home.api.ts) exposes `getHome()`
- [src/services/api/endpoints/transaction.api.ts](../src/services/api/endpoints/transaction.api.ts) exposes `getTransactions()`
- [src/services/api/endpoints/insights.api.ts](../src/services/api/endpoints/insights.api.ts) exposes `getInsights()`

These wrappers keep the request details in one place and let the store actions read like feature-level operations rather than raw HTTP calls.

## Zustand Store

The global store is created in [src/store/useAppStore.ts](../src/store/useAppStore.ts).

It combines multiple slices:

- `createAppSlice` for hydration and global errors
- `createTransactionSlice` for transaction data and fetching
- `createHomeSlice` for the home dashboard data and fetching
- `createInsightsSlice` for insights data and fetching

The store is also wrapped with zustand `persist`, which means selected parts of state are written to local storage and restored on app launch.

## MMKV Persistence

Persistence is configured in [src/store/storage.ts](../src/store/storage.ts).

MMKV is used as the storage engine because it is fast and works well for React Native local persistence.

The setup works like this:

- `createMMKV({ id: 'spendlyst-storage' })` creates the storage instance
- `mmkvStateStorage` adapts MMKV to zustand's `StateStorage` interface
- `createJSONStorage()` wraps that adapter so zustand can persist JSON state

### What is persisted

Only transaction-related data is persisted:

- `transactionsById`
- `transactionIds`
- `transactionIdsByMonth`
- `transactionMonthIds`
- `transactionOverview`
- `transactionsLastFetchedAt`

This is controlled by `partialize` in [src/store/useAppStore.ts](../src/store/useAppStore.ts).

### Versioning and migration

The persisted state is versioned with `STORAGE_VERSION = 1`.

`migratePersistedTransactionsState()` handles older persisted shapes and normalizes them into the current transaction state format.
That protects the app when the storage schema changes.

### Hydration

`onRehydrateStorage` sets `hasHydrated` once MMKV state has been restored.
Screens use this flag to decide whether to show their initial loading state.

## Where API Calls Happen In The UI

The actual screen-level calls happen in `useEffect` and refresh handlers.

- [src/screens/Home/HomeScreen.tsx](../src/screens/Home/HomeScreen.tsx) calls `fetchHome()` on mount and `fetchHome({ force: true })` on retry or pull-to-refresh.
- [src/screens/Transactions/TransactionsScreen.tsx](../src/screens/Transactions/TransactionsScreen.tsx) calls `fetchTransactions()` on mount and refreshes with `force: true`.
- [src/screens/Insights/InsightsScreen.tsx](../src/screens/Insights/InsightsScreen.tsx) calls `fetchInsights()` on mount and refreshes with `force: true`.

The screens do not call axios directly. They only call store actions.

## How Responses Are Handled

Each slice follows the same pattern:

1. Set request status to `loading` or `refreshing`.
2. Call the endpoint.
3. Map the API response into app models using the finance mappers.
4. Write normalized state into zustand.
5. Update timestamps so cache freshness can be checked later.
6. On failure, store a feature-specific error and also populate `lastGlobalError`.

Examples:

- Home data is mapped with `mapHomeApiToModel()` and preview transactions are merged into the transaction cache.
- Transactions data is normalized by month with `normalizeTransactionMonths()`.
- Insights data is mapped with `mapInsightsApiToModel()`.

## Cache Behavior

The store avoids redundant calls when cached data is still fresh.

- `isCacheStale()` compares `lastFetchedAt` against `CACHE_TTL_MS`
- if cached data exists and is still fresh, the slice returns early
- `force: true` bypasses that check and refreshes immediately

This is why the app can show fast navigations without hitting the network every time.

## Summary

The data flow is:

screen -> zustand action -> endpoint wrapper -> shared request helper -> axios client -> mock or real backend -> response mapping -> zustand state -> screen rendering

MMKV only handles persistence. It does not call the API itself. All network behavior is centralized in the shared axios/request layer, while zustand stores the fetched data and UI state.
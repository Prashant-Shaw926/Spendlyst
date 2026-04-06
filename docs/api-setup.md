# API And Data Flow

Spendlyst uses a mock-first data layer with local persistence. The app does not depend on a live backend to demonstrate its main finance flows, but it still keeps request logic, domain mapping, state storage, and screen orchestration clearly separated.

## Current Runtime Data Sources

Not every screen is backed by the same source. The app intentionally mixes mock API responses, derived local state, and simulated async services.

| Area | Current source | Notes |
| --- | --- | --- |
| Transactions | Mock API through Axios | Loaded from `src/api/mock/routes.ts` and persisted to MMKV |
| Home dashboard | Derived local state | Built from transactions and goals via selectors and mappers |
| Insights | Derived local state | Computed from persisted transactions and goals |
| Goals | Local seed + persisted state | Seeded once from `src/store/goalSeeds.ts`, then stored in MMKV |
| Profile | Simulated async service | Served from `src/features/profile/services/profile.ts` |
| Notifications feed | Local sample data | UI content comes from `src/features/notifications/data/notifications.ts` |
| Push notification plumbing | Native integration | Firebase Messaging + Notifee are wired in for runtime handling |

## High-Level Data Flow

The main transaction flow looks like this:

```text
screen -> store action -> API service -> request helper -> axios client
      -> mock route -> mapper -> normalized store state -> selector -> screen
```

Home and Insights skip the network step in the current runtime:

```text
transactions + goals in store -> finance mappers/selectors -> dashboard models -> screen
```

## Shared API Client

The shared client lives in `src/api/client.ts`.

### What it does

- creates the Axios instance used by the app
- switches between mock mode and real network mode through the local `USE_MOCK` flag
- applies a request timeout
- normalizes Axios errors into a stable `ApiClientError`
- retries retryable failures with exponential backoff

### Current config

- `USE_MOCK = true`
- `API_BASE_URL = '/mock-api'`
- `API_TIMEOUT_MS = 8000`
- `API_RETRY_COUNT = 2`
- `API_RETRY_BASE_DELAY_MS = 300`

## Mock Routes And Fixtures

Mock routes are defined in `src/api/mock/routes.ts`.

### Active route used by the app

- `/mock-api/transactions`

This route powers the transaction fetch path through:

- `src/api/services/transactions.ts`
- `src/store/modules/transactions.ts`

### Included but not currently used as runtime fetches

- `/mock-api/home`
- `/mock-api/insights`

Those fixtures still exist as reference data, but the current app builds Home and Insights from the persisted store instead of calling separate endpoints.

## Transaction Fetch Flow

Transactions are the primary fetched data source in the app.

### Request path

1. A screen or feature hook triggers `fetchTransactions()`.
2. The transaction store module calls `getTransactions()` from `src/api/services/transactions.ts`.
3. The service delegates to `request()` in `src/api/client.ts`.
4. Axios resolves the route through the mock adapter.
5. The response payload is normalized with finance mappers.
6. Zustand stores the normalized entities and overview values.
7. Screens consume the result through selectors from `src/store/index.ts`.

### Normalization details

Normalization is handled by `src/api/mappers/finance.ts`.

Important helpers include:

- `mapTransactionApiToModel()`
- `normalizeTransactionMonths()`
- `buildTransactionCollections()`
- `mapTransactionsToSections()`
- `mapBudgetOverviewFromTransactions()`

These helpers transform raw transaction payloads into:

- `transactionsById`
- `transactionIds`
- `transactionIdsByMonth`
- `transactionMonthIds`
- `transactionOverview`

## CRUD Behavior After Initial Fetch

Once the app has loaded transactions, add, edit, and delete actions are handled locally in the store.

### Add

- `addTransaction()` builds a new transaction model
- a local entity id is generated
- the transaction collections are rebuilt and persisted

### Update

- `updateTransaction()` replaces the matching entity with a rebuilt model
- normalized collections are rebuilt to keep lists, sections, and totals in sync

### Delete

- `deleteTransaction()` removes the entity
- collections and overview values are rebuilt

This means CRUD feels instant and does not require a live backend.

## Home And Insights Derivation

Home and Insights are selector-driven in the current codebase.

### Home

`selectHomeDashboard` combines:

- all transactions
- all goals
- the current `userName`

It then passes that data into `buildHomeDashboard()`.

### Insights

`selectInsightsDashboard` combines:

- all transactions
- all goals

It then passes that data into `buildInsightsDashboard()`.

### Why this matters

There is no separate runtime `fetchHome()` or `fetchInsights()` call today. If transaction or goal data changes, Home and Insights automatically update because they are computed from the same persisted source of truth.

## Goal Data Flow

Goals are fully local in the current implementation.

### Initial seeding

`initializeAppData()` calls `seedGoalsIfEmpty()` from the goal store module.

Seed data lives in:

- `src/store/goalSeeds.ts`

The seed contains a mix of:

- active goals
- planned goals
- completed goals

### Goal CRUD

Goal actions are stored in `src/store/modules/goals.ts`:

- `addGoal()`
- `updateGoal()`
- `deleteGoal()`

Goal models are built through:

- `buildGoalModel()`
- `buildGoalCollections()`

## App Initialization And Hydration

Hydration and first-load behavior are owned by `src/store/modules/app.ts`.

### Initialization sequence

1. Zustand rehydrates persisted MMKV state.
2. `hasHydrated` is set once rehydration finishes.
3. Screens call `initializeAppData()` after hydration.
4. Initialization seeds goals if none exist.
5. Initialization fetches transactions if the local store is empty.

### Result

The app can:

- show persisted local data immediately on relaunch
- avoid reseeding goals once they already exist
- avoid refetching transactions if they were previously persisted

## MMKV Persistence

Persistence is configured in `src/storage/mmkv.ts`.

### Stored state

The app persists:

- normalized transactions
- transaction overview
- normalized goals
- notification permission status
- FCM token
- whether permission was already requested

### Persistence details

- Storage id: `spendlyst-storage`
- Zustand persist key: `spendlyst-store`
- Storage version: `3`

### Migration support

`migratePersistedAppState()` keeps older stored shapes from breaking the app as the persisted structure evolves.

## Error Handling

Error handling is centralized in the client and stored in app state.

### Client level

- `normalizeApiError()` converts raw Axios failures into `ApiClientError`
- errors keep `status`, `code`, `message`, and `retryable`

### Store level

The transaction module writes failures into:

- `transactionsStatus`
- `lastGlobalError`

### Screen level

Screens show `ScreenState` when the initial data load fails and allow retrying `fetchTransactions()`.

## Profile And Notifications

These areas are not part of the shared Axios transaction fetch path, but they are still important to understand.

### Profile

- `src/features/profile/services/profile.ts` simulates an async profile request with `setTimeout`
- `useProfileView()` manages the loading and error state for the Profile screen

### Notifications

- feed UI content comes from `src/features/notifications/data/notifications.ts`
- `NotificationsBootstrap` runs on app mount
- `index.js` registers background handlers for Firebase Messaging and Notifee
- `src/features/notifications/services/notifications.ts` manages permission sync, FCM token sync, channel creation, and foreground display behavior

## If You Want To Swap In A Real Backend

The current structure already leaves room for that change.

Recommended path:

1. Turn off mock mode in `src/api/client.ts`
2. Replace `/mock-api` with your real base URL
3. Keep service functions small and feature-specific
4. Preserve the current mapper layer so UI models stay stable
5. Add dedicated services for Home and Insights only if those become real server-owned endpoints

That approach lets the UI and selectors change as little as possible.

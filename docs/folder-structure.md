# Folder Structure

This document reflects the refactored app structure.

## Source Layout

```text
src/
  api/
    client.ts
    services/
    mappers/
    mock/

  assets/
  components/
    shared/
    features/
  constants/

  features/
    notifications/
      bootstrap/
      data/
      hooks/
      services/
    profile/
      hooks/
      services/
    transactions/
      hooks/

  navigation/

  screens/
    Goals/
    Home/
    Insights/
    Notification/
    Profile/
    SplashScreen/
    Transactions/

  storage/
    mmkv.ts

  store/
    index.ts
    modules/
    goalSeeds.ts
    helpers.ts
    types.ts

  theme/
  types/
  utils/
```

## Ownership Rules

### `src/api`

- `client.ts` is the only axios entry point.
- `services/` contains feature-facing API functions.
- `mappers/` contains API and domain transformation logic.
- `mock/` contains fixture-backed mock routes.

### `src/store`

- `index.ts` is the only public Zustand entry.
- `modules/` contains grouped internal store logic for app, transactions, and goals.
- selectors are exported from `index.ts` instead of living in a separate selector tree.

### `src/storage`

- `mmkv.ts` centralizes persisted storage, migration, and hydration behavior.

### `src/components`

- `shared/` contains reusable UI shared across screens or features
- `features/` contains feature-specific presentational components grouped by screen/feature
- `index.ts` is the shared UI barrel
- no API or storage usage

### `src/features`

- owns non-UI feature logic only
- current responsibilities: hooks, services, bootstrap behavior, and local feature data
- current feature areas with retained logic: transactions, profile, notifications

### `src/screens`

- contains the real screen implementations grouped by route area
- is the only screen entrypoint used by navigation
- may contain screen-level orchestration, but not direct API or storage calls

## Current Screen Coverage

- Home
- Goals
- Goal Detail
- Transactions
- Add Transaction
- Transaction Detail
- Insights
- Profile
- Notification
- Splash

## Removed During Refactor

- `src/services/api/config.ts`
- `src/services/api/request.ts`
- `src/services/api/endpoints/*`
- `src/services/errors/handler.ts`
- `src/store/useAppStore.ts`
- `src/store/useHomeStore.ts`
- `src/store/useInsightsStore.ts`
- `src/store/useTransactionStore.ts`
- `src/store/selectors/*`
- `src/store/slices/*`
- `src/store/storage.ts`
- `Settings` navigation and screen artifacts

## Data Flow

```text
API service -> API mapper -> Zustand store -> feature screen/component
```

This keeps network logic, data transformation, persistence, and presentation clearly separated.

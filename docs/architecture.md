# Architecture Overview

Spendlyst is a React Native app organized around a small number of clear layers:

- `navigation` decides how the user moves through the app
- `screens` orchestrate feature behavior for each route
- `components` render reusable UI
- `features` hold non-UI logic that is specific to one domain
- `store` owns global state, mutations, selectors, and initialization
- `api` and `storage` support data loading, mapping, and persistence

## App Bootstrap

The app starts in two places:

- `index.js`
- `App.tsx`

### `index.js`

`index.js` handles native background registrations before the app component mounts:

- registers the app with `AppRegistry`
- wires Firebase Messaging background handling
- wires Notifee background event handling

### `App.tsx`

`App.tsx` creates the top-level provider shell:

- `GestureHandlerRootView`
- `SafeAreaProvider`
- `NotificationsBootstrap`
- `RootNavigator`

This keeps navigation, gesture handling, safe-area support, and notification bootstrap available throughout the app.

## Navigation Structure

Navigation is built with a root stack plus a bottom tab navigator. Each tab owns its own native stack.

### Root stack

Defined in `src/navigation/RootNavigator.tsx`.

- `Splash`
- `Main`

The app launches into `Splash`, then transitions into the main tab experience.

### Bottom tabs

Defined in `src/navigation/BottomTabNavigator.tsx`.

- `HomeTab`
- `InsightsTab`
- `TransactionsTab`
- `GoalsTab`
- `ProfileTab`

Each tab is rendered through a dedicated stack navigator so feature-specific detail screens can slide on top of the tab shell without affecting sibling tabs.

### Per-tab stacks

- `HomeStack`: `Home`, `Notification`
- `InsightsStack`: `Insights`, `Notification`
- `TransactionsStack`: `Transactions`, `AddTransaction`, `TransactionDetail`, `Notification`
- `GoalsStack`: `Goals`, `GoalDetail`, `Notification`
- `ProfileStack`: `Profile`, `Notification`

## Screen Responsibility Model

Screens are intentionally thin orchestration layers.

Their main jobs are:

- trigger initialization after hydration
- read selectors from the store
- call feature hooks where needed
- route users to the next screen
- decide which UI state to render

Screens are not intended to:

- call Axios directly
- own persistence
- contain deep data transformation logic

## Global State Design

Global state lives in a single Zustand store created in `src/store/index.ts`.

The store is composed from three modules:

- `createAppModule`
- `createTransactionModule`
- `createGoalModule`

### App module

Owned by `src/store/modules/app.ts`.

Responsibilities:

- hydration flags
- one-time app initialization
- global error state
- notification permission status
- FCM token
- user name

### Transaction module

Owned by `src/store/modules/transactions.ts`.

Responsibilities:

- fetch transactions
- keep normalized transaction entities
- keep transaction overview totals
- add, update, and delete transaction entries

### Goal module

Owned by `src/store/modules/goals.ts`.

Responsibilities:

- seed initial goals
- keep normalized goal entities
- add, update, and delete goals

## Hydration And Initialization

Spendlyst uses MMKV-backed Zustand persistence.

### Hydration flow

1. Persisted state is restored from MMKV.
2. `onRehydrateStorage` marks `hasHydrated = true`.
3. Screens that depend on app data call `initializeAppData()`.

### Initialization flow

`initializeAppData()` is guarded so it only runs once at a time.

It currently does two things:

1. Seeds goals if none exist
2. Fetches transactions if the local transaction store is empty

This gives the app a local-first feel while still showing a realistic fetch path for the transaction domain.

## Selectors And Derived Models

Selectors exported from `src/store/index.ts` keep screens from manually stitching state together.

Examples:

- `selectAllTransactions`
- `selectTransactionSections`
- `selectGoalSummary`
- `selectHomeDashboard`
- `selectInsightsDashboard`

These selectors usually rely on mapper functions from `src/api/mappers/finance.ts`, which means UI-facing models stay consistent even if raw state shape changes.

## Mapper Layer

The finance mapper file is a key architectural piece:

- converts DTOs into app models
- normalizes transaction collections
- computes totals and labels
- derives dashboard and insights models
- builds goal models and summaries

This keeps formatting, labeling, and derived business logic out of screens.

## Feature Hooks And Services

The `src/features` directory is reserved for domain-specific non-UI logic.

Current examples:

- `transactions/hooks/useTransactionsView.ts`
- `profile/hooks/useProfileView.ts`
- `notifications/bootstrap/NotificationsBootstrap.tsx`
- `notifications/services/notifications.ts`

This layer is the right place for:

- view-model hooks
- bootstrap behavior
- simulated services
- feature-specific transformation or coordination logic

## Shared Components vs Feature Components

`src/components/shared` contains reusable building blocks such as:

- buttons
- text fields
- headers
- charts
- list rows
- reusable loading and state components

`src/components/features` contains presentation components tied to one product area, such as goal cards or home transaction items.

This split helps reuse without forcing every visual component to be globally generic.

## Notifications Architecture

Notifications are partly UI-driven and partly native-integrated.

### UI side

- Notification feed content is currently local sample data
- The Notification screen renders grouped feed items through a feature hook

### Native side

- `NotificationsBootstrap` runs on app mount
- notification services create the Android channel, sync permission state, and sync FCM tokens
- background handlers are registered in `index.js`

This keeps the native wiring in place even though the feed UI is still sample-data based.

## Why This Structure Works Well For The Assignment

The codebase is designed to show both product thinking and engineering discipline:

- feature screens are easy to follow
- state and persistence are centralized
- visual models are derived in one place
- the app can run without a backend
- the structure is still expandable if a real backend is introduced later

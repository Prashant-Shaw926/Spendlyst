# Folder Structure

This document explains how Spendlyst is organized today and where new work should live.

## Top-Level Layout

```text
.
|-- android/
|-- ios/
|-- docs/
|-- src/
|-- App.tsx
|-- index.js
|-- global.css
|-- tailwind.config.js
|-- package.json
|-- README.md
```

## `src/` Layout

```text
src/
  api/
    client.ts
    mappers/
    mock/
    services/

  assets/
    icons/
    images/

  components/
    features/
    shared/
    index.ts

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
    stacks/
    BottomTabNavigator.tsx
    RootNavigator.tsx

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
    modules/
    goalSeeds.ts
    helpers.ts
    index.ts
    types.ts

  theme/
    colors.ts
    index.ts
    scale.ts

  types/
  utils/
```

## Ownership Rules By Folder

### `src/api`

Use this folder for request and mapping concerns.

- `client.ts` is the shared Axios client and retry/error helper entry point
- `services/` exposes feature-facing request functions
- `mock/` contains mock routes and JSON fixtures
- `mappers/` converts raw payloads into UI-friendly models and derived dashboards

What should not go here:

- screen orchestration
- persistent storage setup
- component rendering

### `src/assets`

Use this folder for static app assets.

- `icons/` contains SVG-based visual assets
- `images/` contains bitmap assets such as the splash logo

### `src/components`

Use this folder for reusable presentational UI.

#### `shared/`

Put cross-feature building blocks here, such as:

- buttons
- inputs
- headers
- charts
- generic loading blocks
- generic state components

#### `features/`

Put UI that is still reusable, but tied closely to one product area.

Examples:

- home transaction item
- goal hero card
- goal form
- insights summary stats

### `src/constants`

Use this folder for static option lists and app-level constants that are not theme tokens.

Current examples:

- transaction category suggestions
- goal status options
- goal icon options

### `src/features`

This folder owns non-UI logic that belongs to a single domain.

Typical responsibilities:

- view-model hooks
- simulated services
- bootstrap behavior
- static feature data

Current domains:

- `notifications`
- `profile`
- `transactions`

This is the right place for logic that is too domain-specific for `src/components`, but too small to justify new global store modules.

### `src/navigation`

This folder owns route structure, navigator composition, and navigation-specific presentation behavior.

- `RootNavigator.tsx` handles the splash-to-main app shell transition
- `BottomTabNavigator.tsx` owns tab bar structure and tab icons
- `stacks/` holds per-tab stack navigators

### `src/screens`

Each route area has its own folder under `src/screens`.

Screens should:

- read store selectors
- call feature hooks
- orchestrate UI states
- navigate to other screens

Screens should not:

- implement direct Axios calls
- own persistence
- contain long-lived business logic that belongs in mappers, store modules, or feature hooks

### `src/storage`

`src/storage/mmkv.ts` is the persistence boundary.

It owns:

- MMKV instance creation
- Zustand storage adapter
- persisted state versioning
- migration behavior

### `src/store`

This folder owns global app state.

- `index.ts` is the public entry for selectors and `useAppStore`
- `modules/` contains store slices grouped by responsibility
- `goalSeeds.ts` contains the first-run goal data
- `helpers.ts` contains store utilities
- `types.ts` defines store contracts and payload shapes

### `src/theme`

This folder owns theme tokens that are consumed from JavaScript or inline styles.

- `colors.ts` for color values needed outside NativeWind classes
- `scale.ts` for semantic spacing, radius, icon, and typography tokens

### `src/types`

Use this folder for shared TypeScript types that are not owned by a single feature folder.

Current areas:

- navigation contracts
- API DTOs
- domain models

### `src/utils`

Use this folder for framework-agnostic helpers and formatting utilities.

Current areas:

- responsive scaling helpers
- currency formatting
- date formatting

## How To Decide Where New Code Belongs

Use this guide when adding new work:

- New route or screen shell: `src/screens`
- New reusable UI building block: `src/components/shared`
- New domain-specific UI for one area: `src/components/features/<Area>`
- New view-model hook or local domain service: `src/features/<domain>`
- New shared state or mutation: `src/store/modules`
- New DTO-to-model mapping or derived dashboard logic: `src/api/mappers`
- New request wrapper: `src/api/services`
- New static fixture or mock response: `src/api/mock`
- New persisted storage behavior: `src/storage`
- New cross-app type: `src/types`

## Practical Conventions

- Keep network logic out of screens.
- Keep data derivation out of components when it can live in selectors or mappers.
- Prefer adding selectors in `src/store/index.ts` instead of recomputing screen models inline.
- Prefer feature hooks for screen-specific orchestration that is still non-visual.
- Treat `src/components` as mostly presentational and `src/store` as the source of truth.

# Spendlyst

Spendlyst is a React Native personal finance companion app built to demonstrate product thinking, mobile UI design, local-first state handling, and clean feature organization. The app helps users track transactions, review spending patterns, manage savings goals, and understand everyday money habits through a mobile-first experience.

This repository is structured as an assignment-ready submission and a developer-friendly codebase. The root README gives a quick project overview, while the `docs/` folder explains setup, architecture, data flow, feature behavior, theming, and folder ownership in more depth.

## What The App Includes

- A dashboard with current balance, income, expense, and weekly money flow
- Transaction CRUD flows with search, category filters, and detail screens
- Goal tracking with progress, planning, and completion states
- An insights area with spending breakdowns, comparisons, and trends
- Profile and notification screens that round out the mobile product experience
- Local persistence so transactions, goals, and notification permission state survive app restarts

## Assignment Fit

Spendlyst covers the core requirements from the personal finance companion assignment:

- `Home Dashboard`: summary cards, balance overview, and weekly chart
- `Transaction Tracking`: add, edit, delete, search, filter, and history views
- `Goal Or Challenge Feature`: savings goals with progress tracking and planning states
- `Insights Screen`: category breakdown, highest spend, trend summaries, and week-over-week comparison
- `Smooth Mobile UX`: tab + stack navigation, screen states, validation, and touch-friendly flows
- `Local Data Handling Or API Integration`: mock transaction fetch plus persisted client state
- `Code Structure And State Management`: React Native + TypeScript + Zustand + MMKV with separated UI, mappers, services, and store modules

## Screen Map

- `Splash`
- `Home`
- `Insights`
- `Transactions`
- `Add Transaction`
- `Transaction Detail`
- `Goals`
- `Goal Detail`
- `Profile`
- `Notification`

## Tech Stack

### Core app

- React Native `0.84.1`
- React `19.2.3`
- TypeScript
- React Navigation `7`

### Styling and UI

- NativeWind with Tailwind CSS
- Custom theme tokens in `global.css` and `src/theme/*`
- `react-native-gifted-charts` for charts
- `react-native-svg` for icons and vector assets
- `react-native-reanimated` and built-in React Native animation APIs

### State and data

- Zustand for global app state
- MMKV for persisted local storage
- Axios for the API client layer
- Local mock routes and JSON fixtures for transaction fetching

### Native integrations

- `@react-native-firebase/app`
- `@react-native-firebase/messaging`
- `@notifee/react-native`

## Quick Start

### 1. Install dependencies

```sh
npm install
```

### 2. Start Metro

```sh
npm start
```

### 3. Run the app

Android:

```sh
npm run android
```

iOS:

```sh
npm run ios
```

For complete environment setup, native notes, and troubleshooting, see [docs/setup.md](docs/setup.md).

## Available Scripts

- `npm start` - start the Metro bundler
- `npm run android` - build and launch the Android app
- `npm run ios` - build and launch the iOS app
- `npm run lint` - run ESLint across the project
- `npm test` - run Jest

## Data Strategy

The app uses a mixed local and mock-first data model:

- Transactions are fetched through the shared Axios client from mock routes in `src/api/mock/routes.ts`.
- Transactions are normalized and then persisted in MMKV through the Zustand store.
- Goals are seeded locally on first app initialization and then persisted in MMKV.
- Home and Insights are not fetched from separate runtime endpoints. They are derived from the transaction and goal store through selectors and finance mappers.
- Profile data is simulated through an async local service.
- Notification UI content currently comes from local sample data, while Firebase Messaging and Notifee plumbing are already wired into the native project and app bootstrap.

## Documentation Index

- [Technical Docs Index](docs/README.md)
- [Setup Guide](docs/setup.md)
- [Architecture Overview](docs/architecture.md)
- [Folder Structure](docs/folder-structure.md)
- [API And Data Flow](docs/api-setup.md)
- [Features And User Flows](docs/features-and-flows.md)
- [Theme Setup](docs/theme-setup.md)

## Current Status

Spendlyst is documentation-ready and mock-first. The app structure, feature coverage, and data flow are in place for assignment review, but a few engineering follow-ups remain:

- Automated tests have not been added yet, so `npm test` currently exits with no tests found.
- The codebase is not lint-clean yet. `npm run lint` currently reports one remaining error and a number of style warnings.
- Android Firebase configuration is checked in through `android/app/google-services.json`.
- An iOS `GoogleService-Info.plist` is not committed in this repository, so iOS Firebase messaging setup will require your own plist if you want to exercise that path locally.

## Repository Notes

- No backend or `.env` file is required to explore the main finance flows.
- The current runtime behavior is centered on locally persisted state plus mock transaction loading.
- The `docs/` folder is intended to help reviewers, collaborators, and future maintainers get oriented quickly.

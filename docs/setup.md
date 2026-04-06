# Setup Guide

This guide explains how to install and run Spendlyst locally.

## Prerequisites

Spendlyst is a React Native CLI app, so your machine needs the normal React Native native toolchain in addition to Node.

### Required

- Node.js `>= 22.11.0`
- npm
- React Native development environment from the official React Native setup guide

### For Android

- Android Studio
- Android SDK
- an Android emulator or a connected Android device

### For iOS

- macOS
- Xcode
- CocoaPods
- an iOS simulator or a connected iPhone

If your machine is Windows-only, you can still work with the Android project locally, but iOS builds require macOS.

## Install Dependencies

From the project root:

```sh
npm install
```

## Start Metro

From the project root:

```sh
npm start
```

Keep Metro running in its own terminal while launching Android or iOS.

## Run On Android

From the project root:

```sh
npm run android
```

Project-specific notes:

- Android Firebase support is already wired in through `android/build.gradle`, `android/app/build.gradle`, and `android/app/google-services.json`.
- The app uses mock-first transaction data, so no backend or environment file is required to exercise the main flows.

## Run On iOS

### First-time setup

Install Ruby dependencies if needed:

```sh
bundle install
```

Install CocoaPods dependencies:

```sh
cd ios
bundle exec pod install
cd ..
```

### Launch

```sh
npm run ios
```

Project-specific notes:

- The iOS project and Podfile are included in the repo.
- A `GoogleService-Info.plist` is not committed in this repository.
- If you want to fully exercise Firebase Messaging on iOS, add your own plist and rerun pod installation if required.

## App Behavior After Launch

Once the app is running:

- the splash screen transitions into the Home tab
- the app hydrates any persisted MMKV data
- goals are seeded locally on first launch if none exist
- transactions are fetched from local mock routes if the transaction store is empty

You do not need a live backend to review the main assignment features.

## Available Commands

| Command | What it does |
| --- | --- |
| `npm start` | Starts Metro |
| `npm run android` | Builds and launches Android |
| `npm run ios` | Builds and launches iOS |
| `npm run lint` | Runs ESLint |
| `npm test` | Runs Jest |

## Native Integration Notes

### Notifications

Spendlyst includes native notification plumbing:

- Firebase Messaging
- Notifee
- Android notification channel setup
- foreground and background handlers

Where that happens:

- `index.js`
- `src/features/notifications/bootstrap/NotificationsBootstrap.tsx`
- `src/features/notifications/services/notifications.ts`

### Mock-first data

Spendlyst ships with a mock-first setup. Transactions are loaded from:

- `src/api/mock/routes.ts`
- `src/api/mock/transactions.json`

Home and Insights are computed locally from persisted transactions and goals.

## Troubleshooting

### Metro cache issues

If the app behaves strangely after dependency or config changes:

```sh
npm start -- --reset-cache
```

### Native dependency issues on iOS

If iOS pods are out of sync:

```sh
cd ios
bundle exec pod install
cd ..
```

### Fresh install if packages drift

If local dependencies are corrupted:

1. Delete `node_modules`
2. Run `npm install`
3. Restart Metro

### Android device not detected

Make sure:

- Android Studio has an emulator running
- or a physical device is connected with USB debugging enabled

### Notification behavior not appearing on iOS

Check:

- that your own `GoogleService-Info.plist` has been added
- that push-related entitlements and signing are configured in Xcode if you plan to test real push delivery

## Recommended Next Reads

After setup, use these docs to understand the codebase:

- [architecture.md](architecture.md)
- [features-and-flows.md](features-and-flows.md)
- [api-setup.md](api-setup.md)

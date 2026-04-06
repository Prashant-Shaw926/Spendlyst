# Spendlyst Folder Structure and File Purpose

This document describes the repository structure and the purpose of every tracked folder and file.

## Notes

- This inventory is based on Git-tracked files.
- Generated/build output folders (for example `android/build`, `android/app/build`, and `node_modules`) are intentionally not documented file-by-file.
- Path separators are shown as `/` for consistency.

## Folder Reference

| Folder | Purpose |
|---|---|
| `.bundle/` | Ruby Bundler local configuration for CocoaPods tooling. |
| `.vscode/` | Editor/project-level VS Code settings and integrations. |
| `__mocks__/` | Jest manual mocks for native modules and style imports. |
| `__tests__/` | Unit/integration tests for app, API layer, and store logic. |
| `android/` | Android native project, Gradle config, resources, and entry classes. |
| `android/app/` | Android application module. |
| `android/app/src/` | Android source-set root. |
| `android/app/src/main/` | Main Android app source set (manifest, Java/Kotlin, resources). |
| `android/app/src/main/java/` | Android source code package root. |
| `android/app/src/main/java/com/` | Java package namespace root. |
| `android/app/src/main/java/com/spendlyst/` | App Android entry classes (`MainActivity`, `MainApplication`). |
| `android/app/src/main/res/` | Android resources (drawables, mipmaps, values). |
| `android/app/src/main/res/drawable/` | XML drawable resources. |
| `android/app/src/main/res/mipmap-anydpi-v26/` | Adaptive launcher icon XML definitions. |
| `android/app/src/main/res/mipmap-hdpi/` | High-density launcher icon assets. |
| `android/app/src/main/res/mipmap-mdpi/` | Medium-density launcher icon assets. |
| `android/app/src/main/res/mipmap-xhdpi/` | Extra-high-density launcher icon assets. |
| `android/app/src/main/res/mipmap-xxhdpi/` | 2x extra-high-density launcher icon assets. |
| `android/app/src/main/res/mipmap-xxxhdpi/` | 3x extra-high-density launcher icon assets. |
| `android/app/src/main/res/values/` | Android string/style value definitions. |
| `android/gradle/` | Gradle support files. |
| `android/gradle/wrapper/` | Gradle Wrapper binaries and version configuration. |
| `docs/` | Project-specific documentation. |
| `ios/` | iOS native project (Xcode project, app target, Podfile). |
| `ios/Spendlyst/` | iOS app target sources and metadata. |
| `ios/Spendlyst/Images.xcassets/` | iOS asset catalog container. |
| `ios/Spendlyst/Images.xcassets/AppIcon.appiconset/` | iOS app icon set metadata/assets. |
| `ios/Spendlyst.xcodeproj/` | Xcode project definition. |
| `ios/Spendlyst.xcodeproj/xcshareddata/` | Shared Xcode project settings. |
| `ios/Spendlyst.xcodeproj/xcshareddata/xcschemes/` | Shared Xcode build/run scheme files. |
| `src/` | Main TypeScript application source. |
| `src/assets/` | Static assets consumed by app code. |
| `src/assets/icons/` | SVG icon assets and icon export index. |
| `src/components/` | Reusable React UI components. |
| `src/components/bootstrap/` | App bootstrap components run at startup. |
| `src/components/features/` | Feature-scoped UI components by domain. |
| `src/components/features/Goals/` | Goal-management feature components. |
| `src/components/features/home/` | Home dashboard feature components. |
| `src/components/features/insights/` | Insights/analytics feature components. |
| `src/components/features/transactions/` | Transaction feature components. |
| `src/components/shared/` | Cross-feature reusable UI primitives/sections. |
| `src/constants/` | App constants and static domain config. |
| `src/navigation/` | Navigation containers and route composition. |
| `src/navigation/stacks/` | Screen stack definitions per section/tab. |
| `src/screens/` | Screen-level containers rendered by navigation. |
| `src/screens/Goals/` | Goal-related screens. |
| `src/screens/Home/` | Home screen container. |
| `src/screens/Insights/` | Insights screen container. |
| `src/screens/Notification/` | Notifications screen container. |
| `src/screens/Profile/` | Profile screen container. |
| `src/screens/Settings/` | Settings screen container. |
| `src/screens/SplashScreen/` | Splash/startup screen container. |
| `src/screens/Transactions/` | Transaction-related screens. |
| `src/services/` | API, errors, mock data, and notification service layer. |
| `src/services/api/` | HTTP client/request setup and API endpoint modules. |
| `src/services/api/endpoints/` | Feature-specific API endpoint wrappers. |
| `src/services/errors/` | Centralized error handling logic. |
| `src/services/mock/` | Mock API payloads/routes used for local/testing flows. |
| `src/services/notifications/` | Push/local notification service code. |
| `src/store/` | State management setup, store hooks, persistence, and seeds. |
| `src/store/selectors/` | Memoized/select helper functions for store reads. |
| `src/store/slices/` | Store slice definitions and mutation helpers. |
| `src/theme/` | Theme tokens and responsive scaling primitives. |
| `src/types/` | TypeScript type contracts for API/domain/navigation. |
| `src/utils/` | Shared utility helpers. |
| `src/utils/formatters/` | Formatting helpers (currency/date). |
| `src/utils/mappers/` | Data mapping/transformation helpers. |

## File Reference

### Root configuration and entry files

| File | Purpose |
|---|---|
| `.bundle/config` | Bundler configuration for Ruby-based tooling (CocoaPods setup). |
| `.eslintrc.js` | ESLint rule configuration for linting JavaScript/TypeScript. |
| `.gitignore` | Git ignore patterns for generated and local files. |
| `.prettierrc.js` | Prettier formatting configuration. |
| `.vscode/mcp.json` | VS Code MCP integration configuration for the workspace. |
| `.watchmanconfig` | Watchman configuration used by Metro file watching. |
| `App.tsx` | Root React component mounted by React Native runtime. |
| `Gemfile` | Ruby gem dependencies (Bundler/CocoaPods workflow). |
| `README.md` | Project overview and setup/run instructions. |
| `app.json` | React Native app metadata (name/display name). |
| `babel.config.js` | Babel configuration used by Metro/Jest transforms. |
| `declarations.d.ts` | Global TypeScript declarations for non-code imports/types. |
| `global.css` | Global styles for NativeWind/Tailwind style interop. |
| `index.js` | JavaScript entry point that registers app root. |
| `jest.config.js` | Jest test runner configuration. |
| `jest.setup.js` | Jest global setup (mocks and test environment hooks). |
| `metro.config.js` | Metro bundler configuration. |
| `nativewind-env.d.ts` | Type support for NativeWind/Tailwind usage. |
| `package-lock.json` | npm lockfile with exact dependency versions. |
| `package.json` | Project scripts, dependencies, and npm metadata. |
| `tailwind.config.js` | Tailwind design token/utilities configuration. |
| `tsconfig.json` | TypeScript compiler options and path settings. |

### Documentation files

| File | Purpose |
|---|---|
| `docs/api-setup.md` | API integration/setup documentation. |
| `docs/theme-setup.md` | Theme/token setup documentation. |

### Testing and mocks

| File | Purpose |
|---|---|
| `__tests__/App.test.tsx` | Tests for root app rendering behavior. |
| `__tests__/financeMappers.test.ts` | Tests for finance mapping utility logic. |
| `__tests__/request.test.ts` | Tests for API request wrapper behavior. |
| `__tests__/store.test.ts` | Tests for store logic/state behavior. |
| `__mocks__/giftedChartsMock.js` | Jest mock for gifted-charts dependency. |
| `__mocks__/linearGradientMock.js` | Jest mock for linear gradient native module. |
| `__mocks__/reactNativeCssInteropJsxDevRuntimeMock.js` | Jest mock for CSS interop JSX dev runtime. |
| `__mocks__/reactNativeCssInteropJsxRuntimeMock.js` | Jest mock for CSS interop JSX runtime. |
| `__mocks__/reactNativeCssInteropMock.js` | Jest mock for CSS interop module. |
| `__mocks__/styleMock.js` | Jest mock for style imports. |
| `__mocks__/svgMock.js` | Jest mock for SVG imports/components. |

### Android native files

| File | Purpose |
|---|---|
| `android/build.gradle` | Top-level Android Gradle build configuration. |
| `android/gradle.properties` | Gradle properties for Android builds. |
| `android/gradlew` | Unix Gradle wrapper launcher. |
| `android/gradlew.bat` | Windows Gradle wrapper launcher. |
| `android/settings.gradle` | Android module inclusion/settings. |
| `android/gradle/wrapper/gradle-wrapper.jar` | Gradle wrapper runtime JAR. |
| `android/gradle/wrapper/gradle-wrapper.properties` | Gradle distribution version/source config. |
| `android/app/build.gradle` | App module Android build config (SDK, deps, signing/build types). |
| `android/app/debug.keystore` | Debug signing key for local Android builds. |
| `android/app/proguard-rules.pro` | ProGuard/R8 shrink/obfuscation rules. |
| `android/app/src/main/AndroidManifest.xml` | Android manifest (permissions, app components, metadata). |
| `android/app/src/main/ic_launcher-playstore.png` | Play Store launcher icon asset. |
| `android/app/src/main/java/com/spendlyst/MainActivity.kt` | Android main activity entry point. |
| `android/app/src/main/java/com/spendlyst/MainApplication.kt` | Android application class and React host setup. |
| `android/app/src/main/res/drawable/ic_stat_notification.xml` | Notification status-bar icon drawable. |
| `android/app/src/main/res/drawable/rn_edit_text_material.xml` | React Native text input background drawable. |
| `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml` | Adaptive launcher icon foreground/background mapping. |
| `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml` | Adaptive round launcher icon mapping. |
| `android/app/src/main/res/mipmap-hdpi/ic_launcher.webp` | HDPI launcher icon. |
| `android/app/src/main/res/mipmap-hdpi/ic_launcher_background.webp` | HDPI launcher icon background layer. |
| `android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.webp` | HDPI launcher icon foreground layer. |
| `android/app/src/main/res/mipmap-hdpi/ic_launcher_round.webp` | HDPI round launcher icon. |
| `android/app/src/main/res/mipmap-mdpi/ic_launcher.webp` | MDPI launcher icon. |
| `android/app/src/main/res/mipmap-mdpi/ic_launcher_background.webp` | MDPI launcher icon background layer. |
| `android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.webp` | MDPI launcher icon foreground layer. |
| `android/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp` | MDPI round launcher icon. |
| `android/app/src/main/res/mipmap-xhdpi/ic_launcher.webp` | XHDPI launcher icon. |
| `android/app/src/main/res/mipmap-xhdpi/ic_launcher_background.webp` | XHDPI launcher icon background layer. |
| `android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.webp` | XHDPI launcher icon foreground layer. |
| `android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.webp` | XHDPI round launcher icon. |
| `android/app/src/main/res/mipmap-xxhdpi/ic_launcher.webp` | XXHDPI launcher icon. |
| `android/app/src/main/res/mipmap-xxhdpi/ic_launcher_background.webp` | XXHDPI launcher icon background layer. |
| `android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.webp` | XXHDPI launcher icon foreground layer. |
| `android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.webp` | XXHDPI round launcher icon. |
| `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.webp` | XXXHDPI launcher icon. |
| `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_background.webp` | XXXHDPI launcher icon background layer. |
| `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.webp` | XXXHDPI launcher icon foreground layer. |
| `android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp` | XXXHDPI round launcher icon. |
| `android/app/src/main/res/values/strings.xml` | Android string resources (app name, labels). |
| `android/app/src/main/res/values/styles.xml` | Android style/theme resource definitions. |

### iOS native files

| File | Purpose |
|---|---|
| `ios/.xcode.env` | Environment values used by Xcode build scripts. |
| `ios/Podfile` | CocoaPods dependencies and iOS build integration config. |
| `ios/Spendlyst.xcodeproj/project.pbxproj` | Main Xcode project build graph/configuration. |
| `ios/Spendlyst.xcodeproj/xcshareddata/xcschemes/Spendlyst.xcscheme` | Shared Xcode run/build scheme. |
| `ios/Spendlyst/AppDelegate.swift` | iOS app lifecycle/bootstrap entry point. |
| `ios/Spendlyst/Info.plist` | iOS app metadata and permissions/config values. |
| `ios/Spendlyst/LaunchScreen.storyboard` | iOS launch screen UI definition. |
| `ios/Spendlyst/PrivacyInfo.xcprivacy` | iOS privacy manifest declarations. |
| `ios/Spendlyst/Images.xcassets/Contents.json` | Asset catalog metadata. |
| `ios/Spendlyst/Images.xcassets/AppIcon.appiconset/Contents.json` | App icon set metadata. |

### App source files (`src`)

#### Assets

| File | Purpose |
|---|---|
| `src/assets/icons/index.ts` | Central export map for SVG icon components/assets. |
| `src/assets/icons/Car.svg` | Car icon asset. |
| `src/assets/icons/check.svg` | Check icon asset. |
| `src/assets/icons/DollarSign.svg` | Dollar sign icon asset. |
| `src/assets/icons/Expense-box.svg` | Expense box icon asset. |
| `src/assets/icons/Expense.svg` | Expense icon asset. |
| `src/assets/icons/Food.svg` | Food icon asset. |
| `src/assets/icons/Goals.svg` | Goals icon asset. |
| `src/assets/icons/Groceries.svg` | Groceries icon asset. |
| `src/assets/icons/Home.svg` | Home icon asset. |
| `src/assets/icons/Income.svg` | Income icon asset. |
| `src/assets/icons/Insights.svg` | Insights icon asset. |
| `src/assets/icons/NewUpdate.svg` | New update icon asset. |
| `src/assets/icons/Notification.svg` | Notification icon asset. |
| `src/assets/icons/Rent.svg` | Rent icon asset. |
| `src/assets/icons/Salary.svg` | Salary icon asset. |
| `src/assets/icons/Splash-icon.svg` | Splash screen icon asset. |
| `src/assets/icons/Transactions.svg` | Transactions icon asset. |
| `src/assets/icons/Transport.svg` | Transport icon asset. |

#### Components

| File | Purpose |
|---|---|
| `src/components/bootstrap/NotificationsBootstrap.tsx` | Initializes notification listeners/permissions at app startup. |
| `src/components/features/Goals/GoalCard.tsx` | Reusable card UI for a single goal summary. |
| `src/components/features/Goals/GoalFilterTabs.tsx` | Goal status/category tab filters. |
| `src/components/features/Goals/GoalForm.tsx` | Goal create/edit form component. |
| `src/components/features/Goals/GoalHeroCard.tsx` | Highlighted goal hero/summary component. |
| `src/components/features/home/HomeBalanceSection.tsx` | Home screen balance summary section. |
| `src/components/features/home/HomeSavingsCard.tsx` | Home savings summary card component. |
| `src/components/features/home/HomeTransactionItem.tsx` | Home list row for recent transaction. |
| `src/components/features/insights/IncomeExpenseBarChart.tsx` | Insights income-vs-expense chart component. |
| `src/components/features/insights/InsightsSummaryStats.tsx` | Insights summary metric cards/values. |
| `src/components/features/insights/TargetCard.tsx` | Insights target/progress card component. |
| `src/components/features/transactions/TransactionBalanceCard.tsx` | Balance snapshot card for transactions flow. |
| `src/components/features/transactions/TransactionForm.tsx` | Transaction create/edit form UI. |
| `src/components/features/transactions/TransactionMonthSection.tsx` | Month-grouped transaction list section. |
| `src/components/shared/BudgetOverview.tsx` | Shared budget overview summary section. |
| `src/components/shared/ChartSection.tsx` | Shared chart wrapper/section component. |
| `src/components/shared/Header.tsx` | Reusable screen header component. |
| `src/components/shared/HomeScreenSkeleton.tsx` | Loading skeleton for home screen. |
| `src/components/shared/IconButton.tsx` | Reusable icon-only button component. |
| `src/components/shared/Icons.tsx` | Shared icon component helpers/wrappers. |
| `src/components/shared/InsightsScreenSkeleton.tsx` | Loading skeleton for insights screen. |
| `src/components/shared/PillChip.tsx` | Pill/chip UI component. |
| `src/components/shared/PrimaryButton.tsx` | Main button component variant. |
| `src/components/shared/ProgressBar.tsx` | Reusable progress indicator component. |
| `src/components/shared/ScreenState.tsx` | Empty/loading/error state presentation helper. |
| `src/components/shared/SegmentedTabs.tsx` | Segmented tab selector component. |
| `src/components/shared/SkeletonBlock.tsx` | Generic skeleton placeholder block. |
| `src/components/shared/TextField.tsx` | Reusable text input field component. |
| `src/components/shared/TransactionRow.tsx` | Shared transaction row list item component. |
| `src/components/shared/TransactionsScreenSkeleton.tsx` | Loading skeleton for transactions screen. |

#### Constants, navigation, and screens

| File | Purpose |
|---|---|
| `src/constants/finance.ts` | Finance-related constants/defaults and domain config. |
| `src/navigation/BottomTabNavigator.tsx` | Bottom tab navigation container definition. |
| `src/navigation/RootNavigator.tsx` | Root app navigator composition. |
| `src/navigation/stacks/GoalsStack.tsx` | Goals stack route definitions. |
| `src/navigation/stacks/HomeStack.tsx` | Home stack route definitions. |
| `src/navigation/stacks/InsightsStack.tsx` | Insights stack route definitions. |
| `src/navigation/stacks/ProfileStack.tsx` | Profile stack route definitions. |
| `src/navigation/stacks/SettingsStack.tsx` | Settings stack route definitions. |
| `src/navigation/stacks/TransactionsStack.tsx` | Transactions stack route definitions. |
| `src/screens/Goals/GoalDetailScreen.tsx` | Goal detail screen container. |
| `src/screens/Goals/GoalsScreen.tsx` | Goals listing/management screen. |
| `src/screens/Home/HomeScreen.tsx` | Main home dashboard screen. |
| `src/screens/Insights/InsightsScreen.tsx` | Insights analytics screen. |
| `src/screens/Notification/NotificationScreen.tsx` | Notifications screen container. |
| `src/screens/Profile/ProfileScreen.tsx` | Profile screen container. |
| `src/screens/Settings/SettingsScreen.tsx` | Settings screen container. |
| `src/screens/SplashScreen/SplashScreen.tsx` | Splash/startup screen container. |
| `src/screens/Transactions/AddTransactionScreen.tsx` | Add transaction flow screen. |
| `src/screens/Transactions/TransactionDetailScreen.tsx` | Transaction detail screen. |
| `src/screens/Transactions/TransactionsScreen.tsx` | Transaction list/overview screen. |

#### Services

| File | Purpose |
|---|---|
| `src/services/api/client.ts` | Base HTTP client instance configuration. |
| `src/services/api/config.ts` | API base configuration and environment values. |
| `src/services/api/request.ts` | Generic request helper abstraction/wrapper. |
| `src/services/api/endpoints/home.api.ts` | Home-related API endpoint methods. |
| `src/services/api/endpoints/insights.api.ts` | Insights-related API endpoint methods. |
| `src/services/api/endpoints/transaction.api.ts` | Transaction-related API endpoint methods. |
| `src/services/errors/handler.ts` | Shared API/app error normalization and handling. |
| `src/services/mock/home.json` | Mock payload data for home endpoints. |
| `src/services/mock/insights.json` | Mock payload data for insights endpoints. |
| `src/services/mock/routes.ts` | Mock route-to-payload mappings. |
| `src/services/mock/transactions.json` | Mock payload data for transaction endpoints. |
| `src/services/notifications/notifications.ts` | Notification scheduling/permission/service helpers. |

#### Store

| File | Purpose |
|---|---|
| `src/store/goalSeeds.ts` | Seed/default goal data for initialization/testing/demo. |
| `src/store/storage.ts` | Store persistence adapter/storage binding. |
| `src/store/types.ts` | Shared store state/action TypeScript types. |
| `src/store/useAppStore.ts` | Primary app store hook and composition. |
| `src/store/useHomeStore.ts` | Home-focused store hook/selectors. |
| `src/store/useInsightsStore.ts` | Insights-focused store hook/selectors. |
| `src/store/useTransactionStore.ts` | Transactions-focused store hook/selectors. |
| `src/store/selectors/app.selectors.ts` | App-level selector functions. |
| `src/store/selectors/goals.selectors.ts` | Goals selector functions. |
| `src/store/selectors/helpers.ts` | Shared selector helper utilities. |
| `src/store/selectors/home.selectors.ts` | Home selector functions. |
| `src/store/selectors/insights.selectors.ts` | Insights selector functions. |
| `src/store/selectors/transactions.selectors.ts` | Transactions selector functions. |
| `src/store/slices/app.slice.ts` | App-level state slice logic. |
| `src/store/slices/goal.slice.ts` | Goal-related state slice logic. |
| `src/store/slices/helpers.ts` | Slice utility helpers. |
| `src/store/slices/transaction.slice.ts` | Transaction-related state slice logic. |

#### Theme, types, and utilities

| File | Purpose |
|---|---|
| `src/theme/colors.ts` | Theme color tokens/palette definitions. |
| `src/theme/index.ts` | Theme exports/composition entry file. |
| `src/theme/scale.ts` | Responsive scale/spacing/font helpers. |
| `src/types/api.ts` | API response/request TypeScript contracts. |
| `src/types/models.ts` | Domain model TypeScript definitions. |
| `src/types/navigation.ts` | Navigation param/list TypeScript definitions. |
| `src/utils/finance.ts` | Finance calculation/helper utilities. |
| `src/utils/responsive.ts` | Responsive layout/size helper utilities. |
| `src/utils/formatters/currency.ts` | Currency formatting helpers. |
| `src/utils/formatters/date.ts` | Date/time formatting helpers. |
| `src/utils/mappers/finance.ts` | Finance data mapping/transformation helpers. |

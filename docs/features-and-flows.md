# Features And User Flows

Spendlyst is designed as a lightweight finance companion rather than a banking app. The feature set focuses on clarity, repeat usage, and quick decision support.

## Product Areas

### Splash

Purpose:

- create a branded entry point
- transition users into the main app shell

Behavior:

- shows the app logo and wordmark
- animates into view
- navigates to `Main > HomeTab > Home`

### Home

Purpose:

- give users a quick snapshot of their money situation
- surface the latest activity without overwhelming the screen

What the screen shows:

- current balance
- total income
- total expenses
- weekly money flow chart
- recent activity list

Where the data comes from:

- `selectHomeDashboard`
- derived from transactions, goals, and the stored user name

Primary actions:

- open notifications
- jump to the full transaction list
- open a transaction detail from recent activity

### Transactions

Purpose:

- act as the primary ledger and CRUD surface in the app

What the screen shows:

- balance summary
- total income and expense overview
- search input
- type filters
- category chips
- month-grouped transaction history

Primary actions:

- add a transaction
- search by title, category, or notes
- filter by income, expense, or category
- open detail view for any entry

### Add Transaction / Edit Transaction

Purpose:

- handle transaction creation and editing in one shared flow

Form fields:

- title
- amount
- type
- category
- date
- notes

Behavior:

- validates required fields
- uses chip-based quick selection for common categories
- creates a new transaction when no `transactionId` is passed
- updates an existing transaction when `transactionId` is present

### Transaction Detail

Purpose:

- provide a safe place to review, edit, or delete an entry

What the screen shows:

- signed amount
- title
- category
- date
- type
- notes

Primary actions:

- edit transaction
- delete transaction with confirmation

### Goals

Purpose:

- make the app feel more engaging and forward-looking
- turn savings behavior into an ongoing habit instead of a static report

What the screen shows:

- savings hero summary
- active / planned / completed tabs
- goal cards with saved amount, target amount, and progress

Where the data comes from:

- local seed data on first app load
- persisted goal state after that

Primary actions:

- create a new goal
- switch goal status tabs
- open a goal for full detail

### Goal Detail / Goal Edit

Purpose:

- show the full context for a goal
- support create, edit, and delete without leaving the goal area

What the screen shows in detail mode:

- saved amount
- target amount
- remaining amount
- monthly target
- deadline
- projected completion
- summary text

Primary actions:

- edit goal
- delete goal with confirmation

### Insights

Purpose:

- help users interpret patterns rather than just read raw totals

What the screen shows:

- overview totals
- monthly trend chart
- income and expense summary
- highest spending category
- week versus last week change
- frequent transaction type
- spending by category breakdown

Where the data comes from:

- `selectInsightsDashboard`
- derived from the current transaction and goal store

### Profile

Purpose:

- complete the app shell with a personal account area

What the screen shows:

- avatar placeholder
- display name from app state
- profile id, phone, and email from a simulated async service

Behavior:

- includes loading placeholders
- includes an error state if the profile service fails

### Notifications

Purpose:

- provide a product-like notification center instead of leaving reminders as hidden native behavior only

What the screen shows:

- grouped notification feed sections such as Today and Yesterday
- reminder, update, transaction, and expense item types

Current data source:

- local sample notification groups

Related runtime plumbing:

- Notifee and Firebase Messaging are already wired for permission handling and foreground/background notification hooks

## Core User Flows

### App Launch

1. App boots through `index.js`
2. `App.tsx` mounts providers and bootstrap behavior
3. Persisted state rehydrates from MMKV
4. Splash screen appears
5. App routes to the Home tab
6. Initialization seeds goals and fetches transactions if needed

### Add A Transaction

1. Open `Transactions`
2. Tap the plus button
3. Complete the transaction form
4. Submit the form
5. Store state updates immediately
6. Transaction list, totals, Home, and Insights all reflect the change

### Edit Or Delete A Transaction

1. Open a transaction from Home or Transactions
2. Review details
3. Tap `Edit Transaction` to reuse the form flow
4. Or tap `Delete Transaction` and confirm
5. Normalized collections and totals rebuild automatically

### Create Or Edit A Goal

1. Open `Goals`
2. Tap the plus button or open an existing goal
3. Complete the goal form
4. Save changes
5. Goal cards, summaries, and derived dashboards update

### Review Insights

1. Open the `Insights` tab
2. Review current totals and monthly trend
3. Use the summary cards and category list to identify patterns
4. Return to Transactions or Goals to act on the information

## Loading, Empty, And Error States

The app includes dedicated UI states rather than leaving transitions blank.

### Loading states

- Splash animation during app entry
- screen skeletons for Home, Transactions, and Insights
- loading placeholders for Profile fields

### Empty states

- no matching transactions for current search/filter combination
- no goals for the selected goal tab
- no notifications available

### Error states

- reusable `ScreenState` surfaces failed initial transaction loads
- Profile has its own screen-level error presentation

## Assignment Requirement Mapping

| Requirement | Spendlyst implementation |
| --- | --- |
| Home Dashboard | Home screen with totals, balance card, recent activity, weekly chart |
| Transaction Tracking | Searchable, filterable history plus add/edit/delete flows |
| Goal or Challenge Feature | Savings goal system with progress tracking and planning states |
| Insights Screen | Trends, category breakdown, highest spend, and week-over-week comparison |
| Smooth Mobile UX | Tab and stack navigation, validation, loading states, detail screens, confirmations |
| Local Data Handling or API Integration | Mock transaction fetch, MMKV persistence, local goal seeding |
| Code Structure and State Management | Zustand store modules, selectors, mappers, shared components, feature hooks |

## Scope Notes

The current implementation is intentionally practical rather than production-complete.

- Transactions are the main fetched domain today.
- Home and Insights are derived locally from shared state.
- Notifications have real native plumbing but sample feed content.
- Automated tests are still a future improvement rather than a completed part of this submission.

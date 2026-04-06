export type NotifType = 'reminder' | 'update' | 'transaction' | 'expense';

export type NotificationTag = {
  label: string;
};

export type NotificationItem = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  tags?: NotificationTag[];
};

export type NotificationGroup = {
  section: string;
  items: NotificationItem[];
};

export const NOTIFICATIONS: NotificationGroup[] = [
  {
    section: 'Today',
    items: [
      {
        id: 't1',
        type: 'reminder',
        title: 'Reminder!',
        body: 'Set up your automatic saving to meet your savings goal...',
        time: '17:00 - April 24',
      },
      {
        id: 't2',
        type: 'update',
        title: 'New Update',
        body: 'Set up your automatic saving to meet your savings goal...',
        time: '17:00 - April 24',
      },
    ],
  },
  {
    section: 'Yesterday',
    items: [
      {
        id: 'y1',
        type: 'transaction',
        title: 'Transactions',
        body: 'A new transaction has been registered',
        time: '17:00 - April 24',
        tags: [
          { label: 'Groceries' },
          { label: 'Pantry' },
          { label: '-$100,00' },
        ],
      },
      {
        id: 'y2',
        type: 'reminder',
        title: 'Reminder!',
        body: 'Set up your automatic saving to meet your savings goal...',
        time: '17:00 - April 24',
      },
    ],
  },
  {
    section: 'This Weekend',
    items: [
      {
        id: 'w1',
        type: 'expense',
        title: 'Expense Record',
        body: 'We recommend that you be more attentive to your finances.',
        time: '17:00 - April 24',
      },
      {
        id: 'w2',
        type: 'transaction',
        title: 'Transactions',
        body: 'A new transaction has been registered',
        time: '17:00 - April 24',
        tags: [{ label: 'Food' }, { label: 'Dinner' }, { label: '-$70,40' }],
      },
    ],
  },
];

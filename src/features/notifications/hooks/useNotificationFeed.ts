import { useMemo } from 'react';
import { NOTIFICATIONS } from '../data/notifications';

export function useNotificationFeed() {
  const groups = useMemo(() => {
    return NOTIFICATIONS.filter((group) => group.items.length > 0);
  }, []);

  return {
    groups,
    isEmpty: groups.length === 0,
  };
}

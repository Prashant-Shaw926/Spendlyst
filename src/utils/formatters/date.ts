const fullDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
});

const shortDayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
});

const compactMonthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
});

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
});

function padNumber(value: number) {
  return value.toString().padStart(2, '0');
}

export function isValidDateInput(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());

  if (!match) {
    return false;
  }

  const [, year, month, day] = match;
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day), 12);

  return (
    parsedDate.getFullYear() === Number(year) &&
    parsedDate.getMonth() === Number(month) - 1 &&
    parsedDate.getDate() === Number(day)
  );
}

export function createIsoDateTimeFromInput(
  value: string,
  fallbackIso?: string,
) {
  if (!isValidDateInput(value)) {
    return null;
  }

  const [year, month, day] = value.trim().split('-').map(Number);
  const seedDate = fallbackIso ? new Date(fallbackIso) : new Date();
  const parsedDate = new Date(
    year,
    month - 1,
    day,
    seedDate.getHours(),
    seedDate.getMinutes(),
    0,
    0,
  );

  return parsedDate.toISOString();
}

export function formatDateInputValue(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value.slice(0, 10);
  }

  return [
    parsedDate.getFullYear(),
    padNumber(parsedDate.getMonth() + 1),
    padNumber(parsedDate.getDate()),
  ].join('-');
}

export function formatDateLabel(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value.trim();
  }

  return fullDateFormatter.format(parsedDate);
}

export function formatMonthLabel(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value.trim();
  }

  return monthFormatter.format(parsedDate);
}

export function formatShortDayLabel(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value.trim();
  }

  return shortDayFormatter.format(parsedDate);
}

export function formatShortMonthLabel(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value.trim();
  }

  return compactMonthFormatter.format(parsedDate);
}

export function formatTimeLabel(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value.trim();
  }

  return timeFormatter.format(parsedDate);
}

export function formatTransactionMeta(value: string) {
  return `${formatTimeLabel(value)} • ${formatDateLabel(value)}`;
}

export function startOfDay(value: Date) {
  const next = new Date(value);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function addDays(value: Date, amount: number) {
  const next = new Date(value);
  next.setDate(next.getDate() + amount);
  return next;
}

export function addMonths(value: Date, amount: number) {
  const next = new Date(value);
  next.setMonth(next.getMonth() + amount, 1);
  return next;
}

export function startOfWeek(value: Date) {
  const current = startOfDay(value);
  const day = current.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  return addDays(current, offset);
}

export function endOfWeek(value: Date) {
  return addDays(startOfWeek(value), 6);
}

export function getRelativeGreeting(now = new Date()) {
  const hour = now.getHours();

  if (hour < 12) {
    return 'Good Morning';
  }

  if (hour < 18) {
    return 'Good Afternoon';
  }

  return 'Good Evening';
}

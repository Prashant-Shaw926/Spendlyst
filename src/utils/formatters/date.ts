export function formatDateLabel(dateLabel: string) {
  return dateLabel.trim();
}

export function formatTransactionMeta(timeLabel: string, dateLabel: string) {
  return `${timeLabel.trim()} - ${formatDateLabel(dateLabel)}`;
}

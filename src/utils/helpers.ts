const WEEKDAY_LABELS: Record<number, string> = {
  1: 'Երկ',
  2: 'Երք',
  3: 'Չրք',
  4: 'Հնգ',
  5: 'Ուրբ',
  6: 'Շբթ',
  7: 'Կիր',
};

export const getWeekRangeLabel = (weekStart?: number, weekEnd?: number) => {
  if (!weekStart || !weekEnd) return '';
  const start = WEEKDAY_LABELS[weekStart];
  const end = WEEKDAY_LABELS[weekEnd];
  if (!start || !end) return '';
  if (start === end) return start;
  return `${start} - ${end}`;
};

export const formatPhoneHref = (phone?: string) => {
  if (!phone) return undefined;

  const sanitized = phone.replace(/\s+/g, '');

  return sanitized ? `tel:${sanitized}` : undefined;
};

export const formatEmailHref = (email?: string) => {
  if (!email) return undefined;

  const sanitized = email.trim();

  return sanitized ? `mailto:${sanitized}` : undefined;
};

export const formatPhoneDisplay = (phone?: string) => {
  if (!phone) return '';

  const sanitized = phone.replace(/\s+/g, '');

  if (!sanitized.startsWith('+374')) return phone;

  const country = sanitized.slice(0, 4);
  const operator = sanitized.slice(4, 6);
  const part1 = sanitized.slice(6, 9);
  const part2 = sanitized.slice(9, 12);

  return `${country} ${operator} ${part1} ${part2}`;
};

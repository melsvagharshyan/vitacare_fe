export const getWeekDayKey = (day?: number) => {
  if (!day) return null;
  if (day < 1 || day > 7) return null;
  return `weekDays.${day}`;
};

export const getWeekRangeLabel = (
  weekStart?: number,
  weekEnd?: number,
  t?: (key: string) => string
) => {
  const startDayKey = getWeekDayKey(weekStart);
  const endDayKey = getWeekDayKey(weekEnd);

  if (!startDayKey || !endDayKey) return '';

  const translate = t ?? (key => key);

  if (startDayKey === endDayKey) {
    return translate(startDayKey);
  }

  return `${translate(startDayKey)} - ${translate(endDayKey)}`;
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

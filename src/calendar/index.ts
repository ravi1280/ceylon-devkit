export type HolidayCategory = 'public' | 'bank' | 'mercantile';

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  categories: HolidayCategory[];
}

/**
 * Standard Sri Lankan Statutory & Public/Bank/Mercantile Holidays.
 * Covers official annual holidays recognized by CBSL and the Ministry of Public Administration.
 */
export const SRI_LANKAN_HOLIDAYS: Holiday[] = [
  // Fixed annual national holidays
  { date: '2025-01-14', name: 'Tamil Thai Pongal Day', categories: ['public', 'bank', 'mercantile'] },
  { date: '2025-01-13', name: 'Duruthu Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-02-04', name: 'National Day (Independence Day)', categories: ['public', 'bank', 'mercantile'] },
  { date: '2025-02-12', name: 'Navam Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-02-26', name: 'Mahasivarathri Day', categories: ['public', 'bank'] },
  { date: '2025-03-13', name: 'Medin Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-03-31', name: 'Id-Ul-Fitr (Ramazan Festival Day)', categories: ['public', 'bank'] },
  { date: '2025-04-12', name: 'Bak Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-04-13', name: 'Day prior to Sinhala & Tamil New Year Day', categories: ['public', 'bank', 'mercantile'] },
  { date: '2025-04-14', name: 'Sinhala & Tamil New Year Day', categories: ['public', 'bank', 'mercantile'] },
  { date: '2025-04-18', name: 'Good Friday', categories: ['public', 'bank'] },
  { date: '2025-05-01', name: 'May Day (International Workers\' Day)', categories: ['public', 'bank', 'mercantile'] },
  { date: '2025-05-12', name: 'Vesak Full Moon Poya Day', categories: ['public', 'bank', 'mercantile'] },
  { date: '2025-05-13', name: 'Day following Vesak Full Moon Poya Day', categories: ['public', 'bank', 'mercantile'] },
  { date: '2025-06-10', name: 'Poson Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-07-10', name: 'Esala Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-08-08', name: 'Nikini Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-09-05', name: 'Milad-Un-Nabi (Holy Prophet\'s Birthday)', categories: ['public', 'bank', 'mercantile'] },
  { date: '2025-09-07', name: 'Binara Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-10-06', name: 'Vap Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-10-20', name: 'Deepavali Festival Day', categories: ['public', 'bank'] },
  { date: '2025-11-05', name: 'Ill Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-12-04', name: 'Unduvap Full Moon Poya Day', categories: ['public', 'bank'] },
  { date: '2025-12-25', name: 'Christmas Day', categories: ['public', 'bank', 'mercantile'] }
];

export interface WorkingDaysOptions {
  /** Check against Bank holidays (Default: true) */
  bankHolidays?: boolean;
  /** Check against Mercantile holidays (for private sector) (Default: false) */
  mercantileOnly?: boolean;
  /** Treat Saturdays as working days (Default: false) */
  saturdayWorking?: boolean;
}

function formatDateString(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Check if a date is a weekend.
 */
export function isWeekend(date: Date, saturdayWorking = false): boolean {
  const day = date.getDay(); // 0 is Sunday, 6 is Saturday
  if (day === 0) return true;
  if (day === 6) return !saturdayWorking;
  return false;
}

/**
 * Returns holiday details if the given date is a Sri Lankan statutory holiday.
 */
export function getHoliday(date: Date): Holiday | undefined {
  const dateStr = formatDateString(date);
  return SRI_LANKAN_HOLIDAYS.find((h) => h.date === dateStr);
}

/**
 * Check if a given date is a Sri Lankan working day.
 *
 * @example
 * ```ts
 * isWorkingDay(new Date('2025-04-14')); // => false (New Year Day)
 * ```
 */
export function isWorkingDay(date: Date, options?: WorkingDaysOptions): boolean {
  const satWorking = options?.saturdayWorking ?? false;
  if (isWeekend(date, satWorking)) {
    return false;
  }

  const holiday = getHoliday(date);
  if (!holiday) {
    return true;
  }

  if (options?.mercantileOnly) {
    return !holiday.categories.includes('mercantile');
  }

  return false;
}

/**
 * Calculates the number of working days between two dates (inclusive),
 * excluding weekends and statutory Sri Lankan holidays.
 *
 * @example
 * ```ts
 * getWorkingDays(new Date('2025-04-01'), new Date('2025-04-30'));
 * ```
 */
export function getWorkingDays(
  startDate: Date,
  endDate: Date,
  options?: WorkingDaysOptions
): number {
  if (startDate > endDate) {
    return 0;
  }

  let count = 0;
  const current = new Date(startDate.getTime());

  while (current <= endDate) {
    if (isWorkingDay(current, options)) {
      count++;
    }
    current.setDate(current.getDate() + 1);
  }

  return count;
}

/**
 * Adds a specific number of working days to a given start date.
 * Useful for calculating invoice payment due dates or credit terms.
 *
 * @example
 * ```ts
 * // Calculate due date after 10 working days:
 * const dueDate = addWorkingDays(new Date(), 10);
 * ```
 */
export function addWorkingDays(
  startDate: Date,
  daysToAdd: number,
  options?: WorkingDaysOptions
): Date {
  const result = new Date(startDate.getTime());
  let added = 0;

  while (added < daysToAdd) {
    result.setDate(result.getDate() + 1);
    if (isWorkingDay(result, options)) {
      added++;
    }
  }

  return result;
}


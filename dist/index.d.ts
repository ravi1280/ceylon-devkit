/**
 * Options for converting LKR currency to words.
 */
interface ToWordsOptions {
    /** Language output: 'en' for English, 'si' for Sinhala (Default: 'en') */
    lang?: 'en' | 'si';
    /** Whether to append 'Only' / 'පමණයි' at the end (Default: true) */
    showOnly?: boolean;
    /** Format suitable for cheques, wrapped with asterisks (Default: false) */
    chequeFormat?: boolean;
}
/**
 * Options for South Asian LKR currency formatting.
 */
interface FormatLKROptions {
    /** Symbol prefix: 'Rs.' or 'රු.' or 'LKR' (Default: 'Rs. ') */
    prefix?: string;
    /** Decimal places (Default: 2) */
    decimals?: number;
    /** Format in South Asian grouping (Lakhs and Crores) */
    compact?: boolean;
    /** Language for compact text ('en' for Lakhs/Crores, 'si' for ලක්ෂ/කෝටි) */
    compactLang?: 'en' | 'si';
}
/**
 * Converts an LKR numeric amount into English or Sinhala words.
 */
declare function lkrToWords(amount: number, options?: ToWordsOptions): string;
/**
 * Formats a number into LKR currency or South Asian compact format (Lakhs / Crores).
 */
declare function formatLKR(amount: number, options?: FormatLKROptions): string;

interface Bank {
    code: string;
    name: string;
    shortName: string;
    swiftCode?: string;
    headOffice?: string;
}
interface Branch {
    code: string;
    name: string;
    bankCode: string;
    district?: string;
}
/**
 * List of registered commercial and specialized banks in Sri Lanka (CBSL).
 */
declare const SRI_LANKAN_BANKS: Bank[];
/**
 * Common major branch codes across Sri Lankan districts.
 */
declare const SRI_LANKAN_BRANCHES: Branch[];
/**
 * Returns the list of all registered Sri Lankan banks.
 */
declare function getBanks(): Bank[];
/**
 * Search for a bank by its 4-digit code, name, or short name.
 *
 * @example
 * ```ts
 * findBank('7056'); // => Commercial Bank of Ceylon PLC
 * findBank('Sampath'); // => Sampath Bank PLC
 * ```
 */
declare function findBank(query: string): Bank | undefined;
/**
 * Returns branches for a given bank code.
 */
declare function getBranches(bankCode: string): Branch[];
/**
 * Search for a branch by branch code or branch name within a bank.
 */
declare function findBranch(bankCode: string, query: string): Branch | undefined;

interface TinValidationResult {
    isValid: boolean;
    tin?: string;
    formatted?: string;
    error?: string;
}
interface VatValidationResult {
    isValid: boolean;
    vatNumber?: string;
    baseTin?: string;
    branchCode?: string;
    error?: string;
}
interface TaxCalculationOptions {
    /** The monetary amount */
    amount: number;
    /** Whether the amount provided is already inclusive of taxes (Default: false) */
    isInclusive?: boolean;
    /** VAT rate percentage (Default: 18%) */
    vatRate?: number;
    /** Whether to calculate Social Security Contribution Levy (SSCL) (Default: false) */
    includeSSCL?: boolean;
    /** SSCL rate percentage (Default: 2.5%) */
    ssclRate?: number;
}
interface TaxBreakdown {
    baseAmount: number;
    ssclAmount: number;
    vatAmount: number;
    totalTax: number;
    totalAmount: number;
}
/**
 * Validates a Sri Lankan Taxpayer Identification Number (TIN) issued by IRD.
 * Standard format is a 9-digit numeric sequence.
 *
 * @example
 * ```ts
 * validateTIN('123456789'); // => { isValid: true, tin: '123456789', formatted: '123-456-789' }
 * ```
 */
declare function validateTIN(input: string | number): TinValidationResult;
/**
 * Validates a Sri Lankan VAT Registration Number.
 * Format is typically 9 digits followed by a 4-digit code (e.g., 123456789-7000) or 9 digits.
 *
 * @example
 * ```ts
 * validateVAT('123456789-7000'); // => { isValid: true, baseTin: '123456789', branchCode: '7000' }
 * ```
 */
declare function validateVAT(input: string): VatValidationResult;
/**
 * Calculate Sri Lanka VAT (18%) and optional SSCL (2.5%) for invoicing.
 * Supports both tax-exclusive and tax-inclusive calculations.
 *
 * @example
 * ```ts
 * calculateTax({ amount: 10000, includeSSCL: true });
 * // => { baseAmount: 10000, ssclAmount: 250, vatAmount: 1845, totalAmount: 12095 }
 * ```
 */
declare function calculateTax(options: TaxCalculationOptions): TaxBreakdown;

type HolidayCategory = 'public' | 'bank' | 'mercantile';
interface Holiday {
    date: string;
    name: string;
    categories: HolidayCategory[];
}
/**
 * Standard Sri Lankan Statutory & Public/Bank/Mercantile Holidays.
 * Covers official annual holidays recognized by CBSL and the Ministry of Public Administration.
 */
declare const SRI_LANKAN_HOLIDAYS: Holiday[];
interface WorkingDaysOptions {
    /** Check against Bank holidays (Default: true) */
    bankHolidays?: boolean;
    /** Check against Mercantile holidays (for private sector) (Default: false) */
    mercantileOnly?: boolean;
    /** Treat Saturdays as working days (Default: false) */
    saturdayWorking?: boolean;
}
/**
 * Check if a date is a weekend.
 */
declare function isWeekend(date: Date, saturdayWorking?: boolean): boolean;
/**
 * Returns holiday details if the given date is a Sri Lankan statutory holiday.
 */
declare function getHoliday(date: Date): Holiday | undefined;
/**
 * Check if a given date is a Sri Lankan working day.
 *
 * @example
 * ```ts
 * isWorkingDay(new Date('2025-04-14')); // => false (New Year Day)
 * ```
 */
declare function isWorkingDay(date: Date, options?: WorkingDaysOptions): boolean;
/**
 * Calculates the number of working days between two dates (inclusive),
 * excluding weekends and statutory Sri Lankan holidays.
 *
 * @example
 * ```ts
 * getWorkingDays(new Date('2025-04-01'), new Date('2025-04-30'));
 * ```
 */
declare function getWorkingDays(startDate: Date, endDate: Date, options?: WorkingDaysOptions): number;
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
declare function addWorkingDays(startDate: Date, daysToAdd: number, options?: WorkingDaysOptions): Date;

export { type Bank, type Branch, type FormatLKROptions, type Holiday, type HolidayCategory, SRI_LANKAN_BANKS, SRI_LANKAN_BRANCHES, SRI_LANKAN_HOLIDAYS, type TaxBreakdown, type TaxCalculationOptions, type TinValidationResult, type ToWordsOptions, type VatValidationResult, type WorkingDaysOptions, addWorkingDays, calculateTax, findBank, findBranch, formatLKR, getBanks, getBranches, getHoliday, getWorkingDays, isWeekend, isWorkingDay, lkrToWords, validateTIN, validateVAT };

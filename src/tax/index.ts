export interface TinValidationResult {
  isValid: boolean;
  tin?: string;
  formatted?: string;
  error?: string;
}

export interface VatValidationResult {
  isValid: boolean;
  vatNumber?: string;
  baseTin?: string;
  branchCode?: string;
  error?: string;
}

export interface TaxCalculationOptions {
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

export interface TaxBreakdown {
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
export function validateTIN(input: string | number): TinValidationResult {
  if (input === null || input === undefined) {
    return { isValid: false, error: 'TIN cannot be empty.' };
  }

  const tinStr = String(input).trim().replace(/[-\s]/g, '');

  if (!/^\d{9}$/.test(tinStr)) {
    return {
      isValid: false,
      error: 'Invalid TIN. A Sri Lankan TIN must be exactly 9 numeric digits.'
    };
  }

  // Formatting as XXX-XXX-XXX
  const formatted = `${tinStr.slice(0, 3)}-${tinStr.slice(3, 6)}-${tinStr.slice(6, 9)}`;

  return {
    isValid: true,
    tin: tinStr,
    formatted
  };
}

/**
 * Validates a Sri Lankan VAT Registration Number.
 * Format is typically 9 digits followed by a 4-digit code (e.g., 123456789-7000) or 9 digits.
 *
 * @example
 * ```ts
 * validateVAT('123456789-7000'); // => { isValid: true, baseTin: '123456789', branchCode: '7000' }
 * ```
 */
export function validateVAT(input: string): VatValidationResult {
  if (!input || typeof input !== 'string') {
    return { isValid: false, error: 'VAT number must be a valid string.' };
  }

  const clean = input.trim().replace(/\s/g, '');

  // Format 1: 123456789-7000
  const matchWithBranch = clean.match(/^(\d{9})-(\d{4})$/);
  if (matchWithBranch) {
    return {
      isValid: true,
      vatNumber: clean,
      baseTin: matchWithBranch[1],
      branchCode: matchWithBranch[2]
    };
  }

  // Format 2: Just 9 digits or 13 contiguous digits
  if (/^\d{9}$/.test(clean)) {
    return {
      isValid: true,
      vatNumber: `${clean}-7000`,
      baseTin: clean,
      branchCode: '7000'
    };
  }

  if (/^\d{13}$/.test(clean)) {
    return {
      isValid: true,
      vatNumber: `${clean.slice(0, 9)}-${clean.slice(9)}`,
      baseTin: clean.slice(0, 9),
      branchCode: clean.slice(9)
    };
  }

  return {
    isValid: false,
    error: 'Invalid VAT format. Expected 9 digits with optional 4-digit branch suffix (e.g. 123456789-7000).'
  };
}

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
export function calculateTax(options: TaxCalculationOptions): TaxBreakdown {
  const {
    amount,
    isInclusive = false,
    vatRate = 18,
    includeSSCL = false,
    ssclRate = 2.5
  } = options;

  const vRate = vatRate / 100;
  const sRate = includeSSCL ? ssclRate / 100 : 0;

  let baseAmount = 0;
  let ssclAmount = 0;
  let vatAmount = 0;
  let totalAmount = 0;

  if (isInclusive) {
    // Total = Base * (1 + sRate) * (1 + vRate)
    const multiplier = (1 + sRate) * (1 + vRate);
    baseAmount = Number((amount / multiplier).toFixed(2));
    ssclAmount = Number((baseAmount * sRate).toFixed(2));
    vatAmount = Number(((baseAmount + ssclAmount) * vRate).toFixed(2));
    totalAmount = Number(amount.toFixed(2));
  } else {
    baseAmount = Number(amount.toFixed(2));
    ssclAmount = Number((baseAmount * sRate).toFixed(2));
    // In Sri Lankan IRD rules, VAT is charged on (Base + SSCL)
    vatAmount = Number(((baseAmount + ssclAmount) * vRate).toFixed(2));
    totalAmount = Number((baseAmount + ssclAmount + vatAmount).toFixed(2));
  }

  const totalTax = Number((ssclAmount + vatAmount).toFixed(2));

  return {
    baseAmount,
    ssclAmount,
    vatAmount,
    totalTax,
    totalAmount
  };
}


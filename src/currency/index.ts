/**
 * Options for converting LKR currency to words.
 */
export interface ToWordsOptions {
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
export interface FormatLKROptions {
  /** Symbol prefix: 'Rs.' or 'රු.' or 'LKR' (Default: 'Rs. ') */
  prefix?: string;
  /** Decimal places (Default: 2) */
  decimals?: number;
  /** Format in South Asian grouping (Lakhs and Crores) */
  compact?: boolean;
  /** Language for compact text ('en' for Lakhs/Crores, 'si' for ලක්ෂ/කෝටි) */
  compactLang?: 'en' | 'si';
}

/* =========================================================================
 * ENGLISH NUMBER WORDS
 * ========================================================================= */
const EN_ONES = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen'
];

const EN_TENS = [
  '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
];

function convertThreeDigitEnglish(num: number): string {
  let str = '';
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundred > 0) {
    str += `${EN_ONES[hundred]} Hundred`;
    if (remainder > 0) str += ' ';
  }

  if (remainder > 0) {
    if (remainder < 20) {
      str += EN_ONES[remainder];
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;
      str += EN_TENS[ten];
      if (one > 0) str += ` ${EN_ONES[one]}`;
    }
  }

  return str.trim();
}

function integerToEnglishWords(num: number): string {
  if (num === 0) return 'Zero';

  const parts: string[] = [];

  const crores = Math.floor(num / 10000000);
  num %= 10000000;
  if (crores > 0) parts.push(`${integerToEnglishWords(crores)} Crore`);

  const lakhs = Math.floor(num / 100000);
  num %= 100000;
  if (lakhs > 0) parts.push(`${convertThreeDigitEnglish(lakhs)} Lakh`);

  const thousands = Math.floor(num / 1000);
  num %= 1000;
  if (thousands > 0) parts.push(`${convertThreeDigitEnglish(thousands)} Thousand`);

  if (num > 0) parts.push(convertThreeDigitEnglish(num));

  return parts.join(' ');
}

/* =========================================================================
 * SINHALA NUMBER WORDS
 * ========================================================================= */
const SI_ONES = [
  '', 'එක', 'දෙක', 'තුන', 'හතර', 'පහ', 'හය', 'හත', 'අට', 'නවය',
  'දහය', 'එකොළහ', 'දොළහ', 'දහතුන', 'දහහතර', 'පහළොව', 'දහසය', 'දාහත', 'දහඅට', 'දහනවය'
];

const SI_ONES_SUFFIX = [
  '', 'එකයි', 'දෙකයි', 'තුනයි', 'හතරයි', 'පහයි', 'හයයි', 'හතයි', 'අටයි', 'නවයයි',
  'දහයයි', 'එකොළහයි', 'දොළහයි', 'දහතුනයි', 'දහහතරයි', 'පහළොවයි', 'දහසයයි', 'දාහතයි', 'දහඅටයි', 'දහනවයයි'
];

const SI_TENS_PREFIX = [
  '', '', 'විසි', 'තිස්', 'හතළිස්', 'පනස්', 'හැට', 'හැත්තෑ', 'අසූ', 'අනූ'
];

const SI_TENS_SUFFIX = [
  '', '', 'විස්සයි', 'තිහයි', 'හතළිහයි', 'පනහයි', 'හැටයි', 'හැත්තෑවයි', 'අසූවයි', 'අනූවයි'
];

const SI_HUNDREDS = [
  '', 'එක්සිය', 'දෙසිය', 'තුන්සිය', 'හාරසිය', 'පන්සිය', 'හයසිය', 'හත්සිය', 'අටසිය', 'නමසිය'
];

function convertThreeDigitSinhala(num: number, isEnding: boolean): string {
  let str = '';
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundred > 0) {
    if (remainder === 0 && isEnding) {
      return hundred === 1 ? 'සියයයි' : `${SI_HUNDREDS[hundred]}යි`;
    } else {
      str += SI_HUNDREDS[hundred];
      if (remainder > 0) str += ' ';
    }
  }

  if (remainder > 0) {
    if (remainder < 20) {
      str += isEnding ? SI_ONES_SUFFIX[remainder] : SI_ONES[remainder];
    } else {
      const ten = Math.floor(remainder / 10);
      const one = remainder % 10;
      if (one === 0) {
        str += isEnding ? SI_TENS_SUFFIX[ten] : SI_TENS_PREFIX[ten];
      } else {
        str += `${SI_TENS_PREFIX[ten]} ${isEnding ? SI_ONES_SUFFIX[one] : SI_ONES[one]}`;
      }
    }
  }

  return str.trim();
}

function integerToSinhalaWords(num: number): string {
  if (num === 0) return 'බිංදුවයි';

  const parts: string[] = [];

  const crores = Math.floor(num / 10000000);
  num %= 10000000;
  if (crores > 0) {
    const isEnd = num === 0;
    parts.push(`${convertThreeDigitSinhala(crores, false)} ${isEnd ? 'කෝටියයි' : 'කෝටි'}`);
  }

  const lakhs = Math.floor(num / 100000);
  num %= 100000;
  if (lakhs > 0) {
    const isEnd = num === 0;
    parts.push(`${convertThreeDigitSinhala(lakhs, false)} ${isEnd ? 'ලක්ෂයයි' : 'ලක්ෂ'}`);
  }

  const thousands = Math.floor(num / 1000);
  num %= 1000;
  if (thousands > 0) {
    const isEnd = num === 0;
    if (thousands === 1) {
      parts.push(isEnd ? 'එක්දහසයි' : 'එක්දහස්');
    } else {
      parts.push(`${convertThreeDigitSinhala(thousands, false)} ${isEnd ? 'දහසයි' : 'දහස්'}`);
    }
  }

  if (num > 0) {
    parts.push(convertThreeDigitSinhala(num, true));
  }

  return parts.join(' ').trim();
}

/**
 * Converts an LKR numeric amount into English or Sinhala words.
 */
export function lkrToWords(amount: number, options?: ToWordsOptions): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '';
  }

  const lang = options?.lang || 'en';
  const showOnly = options?.showOnly ?? true;
  const chequeFormat = options?.chequeFormat ?? false;

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  const rupees = Math.floor(absAmount);
  const cents = Math.round((absAmount - rupees) * 100);

  let result = '';

  if (lang === 'en') {
    let rupeesText = '';
    if (rupees === 0 && cents > 0) {
      rupeesText = '';
    } else if (rupees === 1) {
      rupeesText = 'One Rupee';
    } else {
      rupeesText = `${integerToEnglishWords(rupees)} Rupees`;
    }

    let centsText = '';
    if (cents > 0) {
      centsText = `${convertThreeDigitEnglish(cents)} Cent${cents === 1 ? '' : 's'}`;
    }

    if (rupeesText && centsText) {
      result = `${rupeesText} and ${centsText}`;
    } else if (rupeesText) {
      result = rupeesText;
    } else if (centsText) {
      result = centsText;
    } else {
      result = 'Zero Rupees';
    }

    if (showOnly) result += ' Only';
    if (isNegative) result = `Minus ${result}`;
  } else {
    let rupeesText = '';
    if (rupees === 0 && cents > 0) {
      rupeesText = '';
    } else {
      rupeesText = `රුපියල් ${integerToSinhalaWords(rupees)}`;
    }

    let centsText = '';
    if (cents > 0) {
      centsText = `ශත ${convertThreeDigitSinhala(cents, true)}`;
    }

    if (rupeesText && centsText) {
      result = `${rupeesText} ${centsText}`;
    } else if (rupeesText) {
      result = rupeesText;
    } else if (centsText) {
      result = centsText;
    } else {
      result = 'රුපියල් බිංදුවයි';
    }

    if (showOnly) result += ' පමණි';
    if (isNegative) result = `ඍණ ${result}`;
  }

  if (chequeFormat) {
    result = `*** ${result} ***`;
  }

  return result;
}

/**
 * Formats a number into LKR currency or South Asian compact format (Lakhs / Crores).
 */
export function formatLKR(amount: number, options?: FormatLKROptions): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '';
  }

  const compactLang = options?.compactLang ?? 'en';
  const defaultPrefix = compactLang === 'si' ? 'රු. ' : 'Rs. ';
  const prefix = options?.prefix ?? defaultPrefix;
  const decimals = options?.decimals ?? 2;
  const compact = options?.compact ?? false;

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  if (compact) {
    if (absAmount >= 10000000) {
      const val = (absAmount / 10000000).toFixed(decimals);
      const unit = compactLang === 'si' ? 'කෝටි' : 'Crores';
      return `${isNegative ? '-' : ''}${prefix}${val} ${unit}`;
    } else if (absAmount >= 100000) {
      const val = (absAmount / 100000).toFixed(decimals);
      const unit = compactLang === 'si' ? 'ලක්ෂ' : 'Lakhs';
      return `${isNegative ? '-' : ''}${prefix}${val} ${unit}`;
    }
  }

  const formatted = absAmount.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return `${isNegative ? '-' : ''}${prefix}${formatted}`;
}

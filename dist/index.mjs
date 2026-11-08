// src/currency/index.ts
var EN_ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen"
];
var EN_TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety"
];
function convertThreeDigitEnglish(num) {
  let str = "";
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  if (hundred > 0) {
    str += `${EN_ONES[hundred]} Hundred`;
    if (remainder > 0) str += " ";
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
function integerToEnglishWords(num) {
  if (num === 0) return "Zero";
  const parts = [];
  const crores = Math.floor(num / 1e7);
  num %= 1e7;
  if (crores > 0) parts.push(`${integerToEnglishWords(crores)} Crore`);
  const lakhs = Math.floor(num / 1e5);
  num %= 1e5;
  if (lakhs > 0) parts.push(`${convertThreeDigitEnglish(lakhs)} Lakh`);
  const thousands = Math.floor(num / 1e3);
  num %= 1e3;
  if (thousands > 0) parts.push(`${convertThreeDigitEnglish(thousands)} Thousand`);
  if (num > 0) parts.push(convertThreeDigitEnglish(num));
  return parts.join(" ");
}
var SI_ONES = [
  "",
  "\u0D91\u0D9A",
  "\u0DAF\u0DD9\u0D9A",
  "\u0DAD\u0DD4\u0DB1",
  "\u0DC4\u0DAD\u0DBB",
  "\u0DB4\u0DC4",
  "\u0DC4\u0DBA",
  "\u0DC4\u0DAD",
  "\u0D85\u0DA7",
  "\u0DB1\u0DC0\u0DBA",
  "\u0DAF\u0DC4\u0DBA",
  "\u0D91\u0D9A\u0DDC\u0DC5\u0DC4",
  "\u0DAF\u0DDC\u0DC5\u0DC4",
  "\u0DAF\u0DC4\u0DAD\u0DD4\u0DB1",
  "\u0DAF\u0DC4\u0DC4\u0DAD\u0DBB",
  "\u0DB4\u0DC4\u0DC5\u0DDC\u0DC0",
  "\u0DAF\u0DC4\u0DC3\u0DBA",
  "\u0DAF\u0DCF\u0DC4\u0DAD",
  "\u0DAF\u0DC4\u0D85\u0DA7",
  "\u0DAF\u0DC4\u0DB1\u0DC0\u0DBA"
];
var SI_ONES_SUFFIX = [
  "",
  "\u0D91\u0D9A\u0DBA\u0DD2",
  "\u0DAF\u0DD9\u0D9A\u0DBA\u0DD2",
  "\u0DAD\u0DD4\u0DB1\u0DBA\u0DD2",
  "\u0DC4\u0DAD\u0DBB\u0DBA\u0DD2",
  "\u0DB4\u0DC4\u0DBA\u0DD2",
  "\u0DC4\u0DBA\u0DBA\u0DD2",
  "\u0DC4\u0DAD\u0DBA\u0DD2",
  "\u0D85\u0DA7\u0DBA\u0DD2",
  "\u0DB1\u0DC0\u0DBA\u0DBA\u0DD2",
  "\u0DAF\u0DC4\u0DBA\u0DBA\u0DD2",
  "\u0D91\u0D9A\u0DDC\u0DC5\u0DC4\u0DBA\u0DD2",
  "\u0DAF\u0DDC\u0DC5\u0DC4\u0DBA\u0DD2",
  "\u0DAF\u0DC4\u0DAD\u0DD4\u0DB1\u0DBA\u0DD2",
  "\u0DAF\u0DC4\u0DC4\u0DAD\u0DBB\u0DBA\u0DD2",
  "\u0DB4\u0DC4\u0DC5\u0DDC\u0DC0\u0DBA\u0DD2",
  "\u0DAF\u0DC4\u0DC3\u0DBA\u0DBA\u0DD2",
  "\u0DAF\u0DCF\u0DC4\u0DAD\u0DBA\u0DD2",
  "\u0DAF\u0DC4\u0D85\u0DA7\u0DBA\u0DD2",
  "\u0DAF\u0DC4\u0DB1\u0DC0\u0DBA\u0DBA\u0DD2"
];
var SI_TENS_PREFIX = [
  "",
  "",
  "\u0DC0\u0DD2\u0DC3\u0DD2",
  "\u0DAD\u0DD2\u0DC3\u0DCA",
  "\u0DC4\u0DAD\u0DC5\u0DD2\u0DC3\u0DCA",
  "\u0DB4\u0DB1\u0DC3\u0DCA",
  "\u0DC4\u0DD0\u0DA7",
  "\u0DC4\u0DD0\u0DAD\u0DCA\u0DAD\u0DD1",
  "\u0D85\u0DC3\u0DD6",
  "\u0D85\u0DB1\u0DD6"
];
var SI_TENS_SUFFIX = [
  "",
  "",
  "\u0DC0\u0DD2\u0DC3\u0DCA\u0DC3\u0DBA\u0DD2",
  "\u0DAD\u0DD2\u0DC4\u0DBA\u0DD2",
  "\u0DC4\u0DAD\u0DC5\u0DD2\u0DC4\u0DBA\u0DD2",
  "\u0DB4\u0DB1\u0DC4\u0DBA\u0DD2",
  "\u0DC4\u0DD0\u0DA7\u0DBA\u0DD2",
  "\u0DC4\u0DD0\u0DAD\u0DCA\u0DAD\u0DD1\u0DC0\u0DBA\u0DD2",
  "\u0D85\u0DC3\u0DD6\u0DC0\u0DBA\u0DD2",
  "\u0D85\u0DB1\u0DD6\u0DC0\u0DBA\u0DD2"
];
var SI_HUNDREDS = [
  "",
  "\u0D91\u0D9A\u0DCA\u0DC3\u0DD2\u0DBA",
  "\u0DAF\u0DD9\u0DC3\u0DD2\u0DBA",
  "\u0DAD\u0DD4\u0DB1\u0DCA\u0DC3\u0DD2\u0DBA",
  "\u0DC4\u0DCF\u0DBB\u0DC3\u0DD2\u0DBA",
  "\u0DB4\u0DB1\u0DCA\u0DC3\u0DD2\u0DBA",
  "\u0DC4\u0DBA\u0DC3\u0DD2\u0DBA",
  "\u0DC4\u0DAD\u0DCA\u0DC3\u0DD2\u0DBA",
  "\u0D85\u0DA7\u0DC3\u0DD2\u0DBA",
  "\u0DB1\u0DB8\u0DC3\u0DD2\u0DBA"
];
function convertThreeDigitSinhala(num, isEnding) {
  let str = "";
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  if (hundred > 0) {
    if (remainder === 0 && isEnding) {
      return hundred === 1 ? "\u0DC3\u0DD2\u0DBA\u0DBA\u0DBA\u0DD2" : `${SI_HUNDREDS[hundred]}\u0DBA\u0DD2`;
    } else {
      str += SI_HUNDREDS[hundred];
      if (remainder > 0) str += " ";
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
function integerToSinhalaWords(num) {
  if (num === 0) return "\u0DB6\u0DD2\u0D82\u0DAF\u0DD4\u0DC0\u0DBA\u0DD2";
  const parts = [];
  const crores = Math.floor(num / 1e7);
  num %= 1e7;
  if (crores > 0) {
    const isEnd = num === 0;
    parts.push(`${convertThreeDigitSinhala(crores, false)} ${isEnd ? "\u0D9A\u0DDD\u0DA7\u0DD2\u0DBA\u0DBA\u0DD2" : "\u0D9A\u0DDD\u0DA7\u0DD2"}`);
  }
  const lakhs = Math.floor(num / 1e5);
  num %= 1e5;
  if (lakhs > 0) {
    const isEnd = num === 0;
    parts.push(`${convertThreeDigitSinhala(lakhs, false)} ${isEnd ? "\u0DBD\u0D9A\u0DCA\u0DC2\u0DBA\u0DBA\u0DD2" : "\u0DBD\u0D9A\u0DCA\u0DC2"}`);
  }
  const thousands = Math.floor(num / 1e3);
  num %= 1e3;
  if (thousands > 0) {
    const isEnd = num === 0;
    if (thousands === 1) {
      parts.push(isEnd ? "\u0D91\u0D9A\u0DCA\u0DAF\u0DC4\u0DC3\u0DBA\u0DD2" : "\u0D91\u0D9A\u0DCA\u0DAF\u0DC4\u0DC3\u0DCA");
    } else {
      parts.push(`${convertThreeDigitSinhala(thousands, false)} ${isEnd ? "\u0DAF\u0DC4\u0DC3\u0DBA\u0DD2" : "\u0DAF\u0DC4\u0DC3\u0DCA"}`);
    }
  }
  if (num > 0) {
    parts.push(convertThreeDigitSinhala(num, true));
  }
  return parts.join(" ").trim();
}
function lkrToWords(amount, options) {
  if (isNaN(amount) || amount === null || amount === void 0) {
    return "";
  }
  const lang = (options == null ? void 0 : options.lang) || "en";
  const showOnly = (options == null ? void 0 : options.showOnly) ?? true;
  const chequeFormat = (options == null ? void 0 : options.chequeFormat) ?? false;
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const rupees = Math.floor(absAmount);
  const cents = Math.round((absAmount - rupees) * 100);
  let result = "";
  if (lang === "en") {
    let rupeesText = "";
    if (rupees === 0 && cents > 0) {
      rupeesText = "";
    } else if (rupees === 1) {
      rupeesText = "One Rupee";
    } else {
      rupeesText = `${integerToEnglishWords(rupees)} Rupees`;
    }
    let centsText = "";
    if (cents > 0) {
      centsText = `${convertThreeDigitEnglish(cents)} Cent${cents === 1 ? "" : "s"}`;
    }
    if (rupeesText && centsText) {
      result = `${rupeesText} and ${centsText}`;
    } else if (rupeesText) {
      result = rupeesText;
    } else if (centsText) {
      result = centsText;
    } else {
      result = "Zero Rupees";
    }
    if (showOnly) result += " Only";
    if (isNegative) result = `Minus ${result}`;
  } else {
    let rupeesText = "";
    if (rupees === 0 && cents > 0) {
      rupeesText = "";
    } else {
      rupeesText = `\u0DBB\u0DD4\u0DB4\u0DD2\u0DBA\u0DBD\u0DCA ${integerToSinhalaWords(rupees)}`;
    }
    let centsText = "";
    if (cents > 0) {
      centsText = `\u0DC1\u0DAD ${convertThreeDigitSinhala(cents, true)}`;
    }
    if (rupeesText && centsText) {
      result = `${rupeesText} ${centsText}`;
    } else if (rupeesText) {
      result = rupeesText;
    } else if (centsText) {
      result = centsText;
    } else {
      result = "\u0DBB\u0DD4\u0DB4\u0DD2\u0DBA\u0DBD\u0DCA \u0DB6\u0DD2\u0D82\u0DAF\u0DD4\u0DC0\u0DBA\u0DD2";
    }
    if (showOnly) result += " \u0DB4\u0DB8\u0DAB\u0DD2";
    if (isNegative) result = `\u0D8D\u0DAB ${result}`;
  }
  if (chequeFormat) {
    result = `*** ${result} ***`;
  }
  return result;
}
function formatLKR(amount, options) {
  if (isNaN(amount) || amount === null || amount === void 0) {
    return "";
  }
  const compactLang = (options == null ? void 0 : options.compactLang) ?? "en";
  const defaultPrefix = compactLang === "si" ? "\u0DBB\u0DD4. " : "Rs. ";
  const prefix = (options == null ? void 0 : options.prefix) ?? defaultPrefix;
  const decimals = (options == null ? void 0 : options.decimals) ?? 2;
  const compact = (options == null ? void 0 : options.compact) ?? false;
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  if (compact) {
    if (absAmount >= 1e7) {
      const val = (absAmount / 1e7).toFixed(decimals);
      const unit = compactLang === "si" ? "\u0D9A\u0DDD\u0DA7\u0DD2" : "Crores";
      return `${isNegative ? "-" : ""}${prefix}${val} ${unit}`;
    } else if (absAmount >= 1e5) {
      const val = (absAmount / 1e5).toFixed(decimals);
      const unit = compactLang === "si" ? "\u0DBD\u0D9A\u0DCA\u0DC2" : "Lakhs";
      return `${isNegative ? "-" : ""}${prefix}${val} ${unit}`;
    }
  }
  const formatted = absAmount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  return `${isNegative ? "-" : ""}${prefix}${formatted}`;
}

// src/bank/index.ts
var SRI_LANKAN_BANKS = [
  { code: "7010", name: "Bank of Ceylon", shortName: "BOC", swiftCode: "BCEYLKLX" },
  { code: "7056", name: "Commercial Bank of Ceylon PLC", shortName: "Commercial Bank", swiftCode: "CCEYLKLX" },
  { code: "7083", name: "Hatton National Bank PLC", shortName: "HNB", swiftCode: "HBLILKLX" },
  { code: "7135", name: "People's Bank", shortName: "People's Bank", swiftCode: "PSBKLKLX" },
  { code: "7162", name: "Nations Trust Bank PLC", shortName: "NTB", swiftCode: "NTBLLKLX" },
  { code: "7214", name: "National Development Bank PLC", shortName: "NDB", swiftCode: "NDBLLKLX" },
  { code: "7278", name: "Sampath Bank PLC", shortName: "Sampath Bank", swiftCode: "BSAMLKLX" },
  { code: "7287", name: "Seylan Bank PLC", shortName: "Seylan Bank", swiftCode: "SEYBLKLX" },
  { code: "7302", name: "Pan Asia Banking Corporation PLC", shortName: "Pan Asia Bank", swiftCode: "PABCLLLX" },
  { code: "7311", name: "Union Bank of Colombo PLC", shortName: "Union Bank", swiftCode: "UBCLKLX" },
  { code: "7463", name: "DFCC Bank PLC", shortName: "DFCC", swiftCode: "DFCCLKLX" },
  { code: "7472", name: "Amana Bank PLC", shortName: "Amana Bank", swiftCode: "AMNLKLX" },
  { code: "7481", name: "Cargills Bank Limited", shortName: "Cargills Bank", swiftCode: "CBKLLKLX" },
  { code: "7092", name: "The Hongkong and Shanghai Banking Corporation Ltd", shortName: "HSBC", swiftCode: "HSBCLKLX" },
  { code: "7108", name: "Standard Chartered Bank", shortName: "Standard Chartered", swiftCode: "SCBLLKLX" },
  { code: "7719", name: "National Savings Bank", shortName: "NSB", swiftCode: "NSBLLKLX" },
  { code: "7728", name: "Sanasa Development Bank PLC", shortName: "SDB Bank", swiftCode: "SDBLLKLX" },
  { code: "7746", name: "Regional Development Bank", shortName: "RDB", swiftCode: "RDBLLKLX" }
];
var SRI_LANKAN_BRANCHES = [
  // Commercial Bank
  { code: "001", name: "Colombo Fort / Head Office", bankCode: "7056", district: "Colombo" },
  { code: "002", name: "Kollupitiya", bankCode: "7056", district: "Colombo" },
  { code: "005", name: "Bambalapitiya", bankCode: "7056", district: "Colombo" },
  { code: "010", name: "Kandy", bankCode: "7056", district: "Kandy" },
  { code: "015", name: "Galle", bankCode: "7056", district: "Galle" },
  { code: "020", name: "Kurunegala", bankCode: "7056", district: "Kurunegala" },
  { code: "025", name: "Gampaha", bankCode: "7056", district: "Gampaha" },
  { code: "030", name: "Negombo", bankCode: "7056", district: "Gampaha" },
  { code: "035", name: "Jaffna", bankCode: "7056", district: "Jaffna" },
  { code: "040", name: "Matara", bankCode: "7056", district: "Matara" },
  // Bank of Ceylon
  { code: "001", name: "City Office (Fort)", bankCode: "7010", district: "Colombo" },
  { code: "002", name: "Kollupitiya", bankCode: "7010", district: "Colombo" },
  { code: "010", name: "Kandy Main", bankCode: "7010", district: "Kandy" },
  { code: "015", name: "Galle Fort", bankCode: "7010", district: "Galle" },
  { code: "025", name: "Gampaha Super Grade", bankCode: "7010", district: "Gampaha" },
  // Sampath Bank
  { code: "001", name: "Colombo Fort / Head Office", bankCode: "7278", district: "Colombo" },
  { code: "002", name: "Kollupitiya", bankCode: "7278", district: "Colombo" },
  { code: "003", name: "Kandy", bankCode: "7278", district: "Kandy" },
  { code: "004", name: "Galle", bankCode: "7278", district: "Galle" },
  { code: "008", name: "Negombo", bankCode: "7278", district: "Gampaha" },
  // People's Bank
  { code: "001", name: "Corporate Banking Division (Colombo)", bankCode: "7135", district: "Colombo" },
  { code: "010", name: "Kandy City", bankCode: "7135", district: "Kandy" },
  { code: "015", name: "Galle Fort", bankCode: "7135", district: "Galle" },
  // HNB
  { code: "001", name: "HNB Towers (Head Office)", bankCode: "7083", district: "Colombo" },
  { code: "010", name: "Kandy", bankCode: "7083", district: "Kandy" },
  { code: "015", name: "Galle", bankCode: "7083", district: "Galle" }
];
function getBanks() {
  return SRI_LANKAN_BANKS;
}
function findBank(query) {
  if (!query) return void 0;
  const q = query.trim().toLowerCase();
  return SRI_LANKAN_BANKS.find(
    (b) => b.code === q || b.shortName.toLowerCase().includes(q) || b.name.toLowerCase().includes(q)
  );
}
function getBranches(bankCode) {
  if (!bankCode) return [];
  const cleanCode = bankCode.trim();
  return SRI_LANKAN_BRANCHES.filter((branch) => branch.bankCode === cleanCode);
}
function findBranch(bankCode, query) {
  if (!bankCode || !query) return void 0;
  const cleanBankCode = bankCode.trim();
  const q = query.trim().toLowerCase();
  return SRI_LANKAN_BRANCHES.find(
    (branch) => branch.bankCode === cleanBankCode && (branch.code === q || branch.name.toLowerCase().includes(q))
  );
}

// src/tax/index.ts
function validateTIN(input) {
  if (input === null || input === void 0) {
    return { isValid: false, error: "TIN cannot be empty." };
  }
  const tinStr = String(input).trim().replace(/[-\s]/g, "");
  if (!/^\d{9}$/.test(tinStr)) {
    return {
      isValid: false,
      error: "Invalid TIN. A Sri Lankan TIN must be exactly 9 numeric digits."
    };
  }
  const formatted = `${tinStr.slice(0, 3)}-${tinStr.slice(3, 6)}-${tinStr.slice(6, 9)}`;
  return {
    isValid: true,
    tin: tinStr,
    formatted
  };
}
function validateVAT(input) {
  if (!input || typeof input !== "string") {
    return { isValid: false, error: "VAT number must be a valid string." };
  }
  const clean = input.trim().replace(/\s/g, "");
  const matchWithBranch = clean.match(/^(\d{9})-(\d{4})$/);
  if (matchWithBranch) {
    return {
      isValid: true,
      vatNumber: clean,
      baseTin: matchWithBranch[1],
      branchCode: matchWithBranch[2]
    };
  }
  if (/^\d{9}$/.test(clean)) {
    return {
      isValid: true,
      vatNumber: `${clean}-7000`,
      baseTin: clean,
      branchCode: "7000"
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
    error: "Invalid VAT format. Expected 9 digits with optional 4-digit branch suffix (e.g. 123456789-7000)."
  };
}
function calculateTax(options) {
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
    const multiplier = (1 + sRate) * (1 + vRate);
    baseAmount = Number((amount / multiplier).toFixed(2));
    ssclAmount = Number((baseAmount * sRate).toFixed(2));
    vatAmount = Number(((baseAmount + ssclAmount) * vRate).toFixed(2));
    totalAmount = Number(amount.toFixed(2));
  } else {
    baseAmount = Number(amount.toFixed(2));
    ssclAmount = Number((baseAmount * sRate).toFixed(2));
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

// src/calendar/index.ts
var SRI_LANKAN_HOLIDAYS = [
  // Fixed annual national holidays
  { date: "2025-01-14", name: "Tamil Thai Pongal Day", categories: ["public", "bank", "mercantile"] },
  { date: "2025-01-13", name: "Duruthu Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-02-04", name: "National Day (Independence Day)", categories: ["public", "bank", "mercantile"] },
  { date: "2025-02-12", name: "Navam Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-02-26", name: "Mahasivarathri Day", categories: ["public", "bank"] },
  { date: "2025-03-13", name: "Medin Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-03-31", name: "Id-Ul-Fitr (Ramazan Festival Day)", categories: ["public", "bank"] },
  { date: "2025-04-12", name: "Bak Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-04-13", name: "Day prior to Sinhala & Tamil New Year Day", categories: ["public", "bank", "mercantile"] },
  { date: "2025-04-14", name: "Sinhala & Tamil New Year Day", categories: ["public", "bank", "mercantile"] },
  { date: "2025-04-18", name: "Good Friday", categories: ["public", "bank"] },
  { date: "2025-05-01", name: "May Day (International Workers' Day)", categories: ["public", "bank", "mercantile"] },
  { date: "2025-05-12", name: "Vesak Full Moon Poya Day", categories: ["public", "bank", "mercantile"] },
  { date: "2025-05-13", name: "Day following Vesak Full Moon Poya Day", categories: ["public", "bank", "mercantile"] },
  { date: "2025-06-10", name: "Poson Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-07-10", name: "Esala Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-08-08", name: "Nikini Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-09-05", name: "Milad-Un-Nabi (Holy Prophet's Birthday)", categories: ["public", "bank", "mercantile"] },
  { date: "2025-09-07", name: "Binara Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-10-06", name: "Vap Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-10-20", name: "Deepavali Festival Day", categories: ["public", "bank"] },
  { date: "2025-11-05", name: "Ill Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-12-04", name: "Unduvap Full Moon Poya Day", categories: ["public", "bank"] },
  { date: "2025-12-25", name: "Christmas Day", categories: ["public", "bank", "mercantile"] }
];
function formatDateString(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function isWeekend(date, saturdayWorking = false) {
  const day = date.getDay();
  if (day === 0) return true;
  if (day === 6) return !saturdayWorking;
  return false;
}
function getHoliday(date) {
  const dateStr = formatDateString(date);
  return SRI_LANKAN_HOLIDAYS.find((h) => h.date === dateStr);
}
function isWorkingDay(date, options) {
  const satWorking = (options == null ? void 0 : options.saturdayWorking) ?? false;
  if (isWeekend(date, satWorking)) {
    return false;
  }
  const holiday = getHoliday(date);
  if (!holiday) {
    return true;
  }
  if (options == null ? void 0 : options.mercantileOnly) {
    return !holiday.categories.includes("mercantile");
  }
  return false;
}
function getWorkingDays(startDate, endDate, options) {
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
function addWorkingDays(startDate, daysToAdd, options) {
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
export {
  SRI_LANKAN_BANKS,
  SRI_LANKAN_BRANCHES,
  SRI_LANKAN_HOLIDAYS,
  addWorkingDays,
  calculateTax,
  findBank,
  findBranch,
  formatLKR,
  getBanks,
  getBranches,
  getHoliday,
  getWorkingDays,
  isWeekend,
  isWorkingDay,
  lkrToWords,
  validateTIN,
  validateVAT
};

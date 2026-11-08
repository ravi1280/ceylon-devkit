export interface Bank {
  code: string;
  name: string;
  shortName: string;
  swiftCode?: string;
  headOffice?: string;
}

export interface Branch {
  code: string;
  name: string;
  bankCode: string;
  district?: string;
}

/**
 * List of registered commercial and specialized banks in Sri Lanka (CBSL).
 */
export const SRI_LANKAN_BANKS: Bank[] = [
  { code: '7010', name: 'Bank of Ceylon', shortName: 'BOC', swiftCode: 'BCEYLKLX' },
  { code: '7056', name: 'Commercial Bank of Ceylon PLC', shortName: 'Commercial Bank', swiftCode: 'CCEYLKLX' },
  { code: '7083', name: 'Hatton National Bank PLC', shortName: 'HNB', swiftCode: 'HBLILKLX' },
  { code: '7135', name: "People's Bank", shortName: "People's Bank", swiftCode: 'PSBKLKLX' },
  { code: '7162', name: 'Nations Trust Bank PLC', shortName: 'NTB', swiftCode: 'NTBLLKLX' },
  { code: '7214', name: 'National Development Bank PLC', shortName: 'NDB', swiftCode: 'NDBLLKLX' },
  { code: '7278', name: 'Sampath Bank PLC', shortName: 'Sampath Bank', swiftCode: 'BSAMLKLX' },
  { code: '7287', name: 'Seylan Bank PLC', shortName: 'Seylan Bank', swiftCode: 'SEYBLKLX' },
  { code: '7302', name: 'Pan Asia Banking Corporation PLC', shortName: 'Pan Asia Bank', swiftCode: 'PABCLLLX' },
  { code: '7311', name: 'Union Bank of Colombo PLC', shortName: 'Union Bank', swiftCode: 'UBCLKLX' },
  { code: '7463', name: 'DFCC Bank PLC', shortName: 'DFCC', swiftCode: 'DFCCLKLX' },
  { code: '7472', name: 'Amana Bank PLC', shortName: 'Amana Bank', swiftCode: 'AMNLKLX' },
  { code: '7481', name: 'Cargills Bank Limited', shortName: 'Cargills Bank', swiftCode: 'CBKLLKLX' },
  { code: '7092', name: 'The Hongkong and Shanghai Banking Corporation Ltd', shortName: 'HSBC', swiftCode: 'HSBCLKLX' },
  { code: '7108', name: 'Standard Chartered Bank', shortName: 'Standard Chartered', swiftCode: 'SCBLLKLX' },
  { code: '7719', name: 'National Savings Bank', shortName: 'NSB', swiftCode: 'NSBLLKLX' },
  { code: '7728', name: 'Sanasa Development Bank PLC', shortName: 'SDB Bank', swiftCode: 'SDBLLKLX' },
  { code: '7746', name: 'Regional Development Bank', shortName: 'RDB', swiftCode: 'RDBLLKLX' }
];

/**
 * Common major branch codes across Sri Lankan districts.
 */
export const SRI_LANKAN_BRANCHES: Branch[] = [
  // Commercial Bank
  { code: '001', name: 'Colombo Fort / Head Office', bankCode: '7056', district: 'Colombo' },
  { code: '002', name: 'Kollupitiya', bankCode: '7056', district: 'Colombo' },
  { code: '005', name: 'Bambalapitiya', bankCode: '7056', district: 'Colombo' },
  { code: '010', name: 'Kandy', bankCode: '7056', district: 'Kandy' },
  { code: '015', name: 'Galle', bankCode: '7056', district: 'Galle' },
  { code: '020', name: 'Kurunegala', bankCode: '7056', district: 'Kurunegala' },
  { code: '025', name: 'Gampaha', bankCode: '7056', district: 'Gampaha' },
  { code: '030', name: 'Negombo', bankCode: '7056', district: 'Gampaha' },
  { code: '035', name: 'Jaffna', bankCode: '7056', district: 'Jaffna' },
  { code: '040', name: 'Matara', bankCode: '7056', district: 'Matara' },

  // Bank of Ceylon
  { code: '001', name: 'City Office (Fort)', bankCode: '7010', district: 'Colombo' },
  { code: '002', name: 'Kollupitiya', bankCode: '7010', district: 'Colombo' },
  { code: '010', name: 'Kandy Main', bankCode: '7010', district: 'Kandy' },
  { code: '015', name: 'Galle Fort', bankCode: '7010', district: 'Galle' },
  { code: '025', name: 'Gampaha Super Grade', bankCode: '7010', district: 'Gampaha' },

  // Sampath Bank
  { code: '001', name: 'Colombo Fort / Head Office', bankCode: '7278', district: 'Colombo' },
  { code: '002', name: 'Kollupitiya', bankCode: '7278', district: 'Colombo' },
  { code: '003', name: 'Kandy', bankCode: '7278', district: 'Kandy' },
  { code: '004', name: 'Galle', bankCode: '7278', district: 'Galle' },
  { code: '008', name: 'Negombo', bankCode: '7278', district: 'Gampaha' },

  // People's Bank
  { code: '001', name: 'Corporate Banking Division (Colombo)', bankCode: '7135', district: 'Colombo' },
  { code: '010', name: 'Kandy City', bankCode: '7135', district: 'Kandy' },
  { code: '015', name: 'Galle Fort', bankCode: '7135', district: 'Galle' },

  // HNB
  { code: '001', name: 'HNB Towers (Head Office)', bankCode: '7083', district: 'Colombo' },
  { code: '010', name: 'Kandy', bankCode: '7083', district: 'Kandy' },
  { code: '015', name: 'Galle', bankCode: '7083', district: 'Galle' }
];

/**
 * Returns the list of all registered Sri Lankan banks.
 */
export function getBanks(): Bank[] {
  return SRI_LANKAN_BANKS;
}

/**
 * Search for a bank by its 4-digit code, name, or short name.
 *
 * @example
 * ```ts
 * findBank('7056'); // => Commercial Bank of Ceylon PLC
 * findBank('Sampath'); // => Sampath Bank PLC
 * ```
 */
export function findBank(query: string): Bank | undefined {
  if (!query) return undefined;
  const q = query.trim().toLowerCase();

  return SRI_LANKAN_BANKS.find(
    (b) =>
      b.code === q ||
      b.shortName.toLowerCase().includes(q) ||
      b.name.toLowerCase().includes(q)
  );
}

/**
 * Returns branches for a given bank code.
 */
export function getBranches(bankCode: string): Branch[] {
  if (!bankCode) return [];
  const cleanCode = bankCode.trim();
  return SRI_LANKAN_BRANCHES.filter((branch) => branch.bankCode === cleanCode);
}

/**
 * Search for a branch by branch code or branch name within a bank.
 */
export function findBranch(bankCode: string, query: string): Branch | undefined {
  if (!bankCode || !query) return undefined;
  const cleanBankCode = bankCode.trim();
  const q = query.trim().toLowerCase();

  return SRI_LANKAN_BRANCHES.find(
    (branch) =>
      branch.bankCode === cleanBankCode &&
      (branch.code === q || branch.name.toLowerCase().includes(q))
  );
}

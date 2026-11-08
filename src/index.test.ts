import { describe, it, expect } from 'vitest';
import {
  lkrToWords,
  formatLKR,
  findBank,
  getBanks,
  getBranches,
  validateTIN,
  validateVAT,
  calculateTax,
  isWorkingDay,
  getWorkingDays,
  addWorkingDays
} from './index.js';

describe('CeylonDevKit', () => {
  describe('1. Currency to Words & Formatter', () => {
    it('converts English amounts correctly', () => {
      expect(lkrToWords(1550.5)).toBe(
        'One Thousand Five Hundred Fifty Rupees and Fifty Cents Only'
      );
    });

    it('converts Sinhala amounts correctly', () => {
      expect(lkrToWords(1550.5, { lang: 'si' })).toBe(
        'රුපියල් එක්දහස් පන්සිය පනහයි ශත පනහයි පමණි'
      );
    });

    it('formats South Asian Lakhs and Crores', () => {
      expect(formatLKR(1500000, { compact: true })).toBe('Rs. 15.00 Lakhs');
      expect(formatLKR(1500000, { compact: true, compactLang: 'si' })).toBe('රු. 15.00 ලක්ෂ');
    });
  });

  describe('2. Bank & Branch Codes', () => {
    it('finds bank by code or name', () => {
      const bankByCode = findBank('7056');
      expect(bankByCode?.shortName).toBe('Commercial Bank');

      const bankByName = findBank('Sampath');
      expect(bankByName?.code).toBe('7278');
    });

    it('lists branches for a bank', () => {
      const branches = getBranches('7056');
      expect(branches.length).toBeGreaterThan(0);
      expect(branches.some((b) => b.name.includes('Kandy'))).toBe(true);
    });
  });

  describe('3. TIN, VAT and Tax Calculator', () => {
    it('validates 9-digit IRD TIN', () => {
      const valid = validateTIN('123456789');
      expect(valid.isValid).toBe(true);
      expect(valid.formatted).toBe('123-456-789');

      const invalid = validateTIN('12345');
      expect(invalid.isValid).toBe(false);
    });

    it('validates VAT format', () => {
      const vat = validateVAT('123456789-7000');
      expect(vat.isValid).toBe(true);
      expect(vat.branchCode).toBe('7000');
    });

    it('calculates VAT and SSCL accurately', () => {
      const tax = calculateTax({ amount: 10000, includeSSCL: true });
      expect(tax.baseAmount).toBe(10000);
      expect(tax.ssclAmount).toBe(250); // 2.5% of 10,000
      expect(tax.vatAmount).toBe(1845); // 18% of (10,000 + 250)
      expect(tax.totalAmount).toBe(12095);
    });
  });

  describe('4. Working Days & Holidays', () => {
    it('detects New Year statutory holidays', () => {
      const newYearDay = new Date('2025-04-14');
      expect(isWorkingDay(newYearDay)).toBe(false);
    });

    it('calculates working days in a range', () => {
      const start = new Date('2025-04-01');
      const end = new Date('2025-04-18');
      const count = getWorkingDays(start, end);
      expect(count).toBeGreaterThan(0);
      expect(count).toBeLessThan(18); // Excludes weekends & April holidays
    });
  });
});


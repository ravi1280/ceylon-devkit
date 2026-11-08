import {
  lkrToWords,
  formatLKR,
  findBank,
  getBranches,
  validateTIN,
  calculateTax,
  isWorkingDay,
  addWorkingDays
} from './src/index.js';

console.log('====================================================');
console.log('🇱🇰  TESTING CEYLON-DEVKIT FEATURES');
console.log('====================================================\n');

// 1. Currency to Words (English & Sinhala)
console.log('1️⃣  CURRENCY TO WORDS & FORMATTER:');
const amount = 1550750.5;

console.log('Amount:', amount);
console.log('English Words :', lkrToWords(amount));
console.log('Sinhala Words :', lkrToWords(amount, { lang: 'si' }));
console.log('Cheque Format :', lkrToWords(amount, { chequeFormat: true }));
console.log('Lakhs Format  :', formatLKR(amount, { compact: true }));
console.log('Sinhala Lakhs :', formatLKR(amount, { compact: true, compactLang: 'si' }));
console.log('\n----------------------------------------------------\n');

// 2. Bank & Branch Codes
console.log('2️⃣  BANK & BRANCH LOOKUP:');
const bank = findBank('Commercial');
console.log('Found Bank :', bank?.name, `(Code: ${bank?.code}, SWIFT: ${bank?.swiftCode})`);

const branches = getBranches('7056');
console.log(`Available Branches for ${bank?.shortName}:`, branches.slice(0, 3));
console.log('\n----------------------------------------------------\n');

// 3. TIN & Tax Calculator
console.log('3️⃣  TIN VALIDATION & TAX CALCULATOR (VAT 18% + SSCL 2.5%):');
const tinResult = validateTIN('123456789');
console.log('TIN (123456789) Valid?:', tinResult.isValid, '| Formatted:', tinResult.formatted);

const taxCalculation = calculateTax({ amount: 100000, includeSSCL: true });
console.log('Tax breakdown for Rs. 100,000 Invoice:');
console.table({
  'Base Amount': `Rs. ${taxCalculation.baseAmount.toLocaleString()}`,
  'SSCL (2.5%)': `Rs. ${taxCalculation.ssclAmount.toLocaleString()}`,
  'VAT (18%)': `Rs. ${taxCalculation.vatAmount.toLocaleString()}`,
  'Total Tax': `Rs. ${taxCalculation.totalTax.toLocaleString()}`,
  'Total Invoice Amount': `Rs. ${taxCalculation.totalAmount.toLocaleString()}`
});
console.log('\n----------------------------------------------------\n');

// 4. CBSL Working Days & Holidays
console.log('4️⃣  WORKING DAYS & CBSL HOLIDAYS:');
const newYearDate = new Date('2025-04-14');
console.log('Is 2025-04-14 a working day?:', isWorkingDay(newYearDate) ? 'Yes' : 'No (Holiday/Weekend)');

const today = new Date('2025-01-01');
const dueDate = addWorkingDays(today, 10);
console.log('Invoice issued on 2025-01-01.');
console.log('Due date after 10 working days:', dueDate.toISOString().split('T')[0]);

console.log('\n====================================================');
console.log('🎉  ALL FEATURES WORKED SUCCESSFULLY!');
console.log('====================================================');


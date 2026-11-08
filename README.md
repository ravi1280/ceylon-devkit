# 🇱🇰 CeylonDevKit

> The all-in-one Sri Lankan developer toolkit for Node.js and TypeScript.

[![npm version](https://img.shields.io/npm/v/ceylon-devkit.svg)](https://www.npmjs.com/package/ceylon-devkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**CeylonDevKit** brings essential Sri Lanka-specific business and financial tools into a single, zero-dependency, type-safe library:

1. 💵 **LKR Currency to Words & Formatter** (Sinhala & English words, Cheque writing, Lakhs & Crores).
2. 🏦 **Sri Lanka Bank & Branch Lookup** (Codes for BOC, Commercial Bank, Sampath, HNB, People's Bank, etc.).
3. 📑 **TIN & VAT Validator + Tax Calculator** (9-digit IRD TIN validator, VAT number validator, and automated 18% VAT & 2.5% SSCL calculator).
4. 📅 **CBSL Working Days & Holidays Calculator** (Bank, Mercantile, and Public holidays filter, working days duration, and payment due date calculator).

---

## 📦 Installation

```bash
npm install ceylon-devkit
# or
yarn add ceylon-devkit
# or
pnpm add ceylon-devkit
```

---

## 🚀 Quick Start & Usage

### 1. Currency to Words (English & Sinhala)

Convert numbers to currency words for Invoices, Receipts, and Cheques:

```typescript
import { lkrToWords, formatLKR } from 'ceylon-devkit';

// English
lkrToWords(1550.50);
// => "One Thousand Five Hundred Fifty Rupees and Fifty Cents Only"

// Sinhala (සිංහල)
lkrToWords(1550.50, { lang: 'si' });
// => "රුපියල් එක්දහස් පන්සිය පනහයි ශත පනහයි පමණි"

// Cheque printing format
lkrToWords(50000, { chequeFormat: true });
// => "*** Fifty Thousand Rupees Only ***"

// South Asian Number Formatter (Lakhs & Crores)
formatLKR(1500000, { compact: true });
// => "Rs. 15.00 Lakhs"

formatLKR(25000000, { compact: true, compactLang: 'si' });
// => "රු. 2.50 කෝටි"
```

---

### 2. Bank & Branch Codes Lookup

Lookup official 4-digit bank codes, SWIFT codes, and branches:

```typescript
import { findBank, getBanks, getBranches } from 'ceylon-devkit';

// Find bank by 4-digit code or name
findBank('7056');
// => { code: '7056', name: 'Commercial Bank of Ceylon PLC', shortName: 'Commercial Bank', swiftCode: 'CCEYLKLX' }

findBank('Sampath');
// => { code: '7278', name: 'Sampath Bank PLC', shortName: 'Sampath Bank', swiftCode: 'BSAMLKLX' }

// Get branches for a bank
const branches = getBranches('7056');
// => [{ code: '001', name: 'Colombo Fort / Head Office', ... }, ...]
```

---

### 3. TIN / VAT Validator & Tax Calculator (VAT & SSCL)

Validate Inland Revenue Department (IRD) TIN numbers and calculate taxes:

```typescript
import { validateTIN, validateVAT, calculateTax } from 'ceylon-devkit';

// Validate 9-digit IRD TIN
validateTIN('123456789');
// => { isValid: true, tin: '123456789', formatted: '123-456-789' }

// Validate VAT Number
validateVAT('123456789-7000');
// => { isValid: true, baseTin: '123456789', branchCode: '7000' }

// Calculate 18% VAT and 2.5% SSCL according to Sri Lankan tax laws
const tax = calculateTax({
  amount: 10000,
  includeSSCL: true // Calculates SSCL 2.5% + VAT 18%
});
/*
Output:
{
  baseAmount: 10000,
  ssclAmount: 250,
  vatAmount: 1845,
  totalTax: 2095,
  totalAmount: 12095
}
*/
```

---

### 4. Working Days & Holidays Calculator

Calculate actual working days excluding weekends and statutory Sri Lankan holidays:

```typescript
import { isWorkingDay, getWorkingDays, addWorkingDays } from 'ceylon-devkit';

// Check if a date is a working day
isWorkingDay(new Date('2025-04-14'));
// => false (Sinhala & Tamil New Year Day)

// Calculate total working days in a date range
const workingDays = getWorkingDays(new Date('2025-04-01'), new Date('2025-04-30'));
// => Returns number of working days excluding weekends and statutory holidays

// Calculate payment due date after 14 working days
const invoiceDueDate = addWorkingDays(new Date(), 14);
```

---

## 🛠️ TypeScript & ESM Support

`ceylon-devkit` comes with full TypeScript definitions out of the box and supports both **CommonJS (`require`)** and **ES Modules (`import`)**.

---

## 📄 License

MIT License © 2026 Ravishka Indraji.

Built for developers, inspired by Sri Lanka 🇱🇰


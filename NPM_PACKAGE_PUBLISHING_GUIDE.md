# 🚀 සම්පූර්ණ NPM Package Guide: මුල සිට Publish කරන තෙක් (Zero to Hero)

> **කර්තෘ:** Ravi & CeylonDevKit Project  
> **අරමුණ:** ඕනෑම ආධුනිකයෙකුට (Beginner) හෝ Developer කෙනෙකුට තමන්ගේම NPM Package එකක් TypeScript මඟින් නිර්මාණය කර, Test කර, නිවැරදිව NPM Registry එකට Publish කිරීම දක්වා සම්පූර්ණ ක්‍රියාවලිය පියවරෙන් පියවර ඉගෙන ගැනීමට.

---

## 📑 පටුන (Table of Contents)
1. [පූර්ව අවශ්‍යතා (Prerequisites)](#1-පූර්ව-අවශ්‍යතා-prerequisites)
2. [පියවර 1: Project එක Initialize කරගැනීම](#2-පියවර-1-project-එක-initialize-කරගැනීම)
3. [පියවර 2: Modern Build Tools Install කරගැනීම](#3-පියවර-2-modern-build-tools-install-කරගැනීම)
4. [පියවර 3: TypeScript Configuration (`tsconfig.json`)](#4-පියවර-3-typescript-configuration-tsconfigjson)
5. [පියවර 4: `package.json` නිවැරදිව Configure කිරීම (CJS + ESM)](#5-පියවර-4-packagejson-නිවැරදිව-configure-කිරීම-cjs--esm)
6. [පියවර 5: Folder Structure & Source Code ලිවීම](#6-පියවර-5-folder-structure--source-code-ලිවීම)
7. [පියවර 6: Unit Testing (Vitest)](#7-පියවර-6-unit-testing-vitest)
8. [පියවර 7: Build කිරීම (`tsup`)](#8-පියවර-7-build-කිරීම-tsup)
9. [පියවර 8: Local එකේ Test කර බැලීම (`npm link` / `demo`)](#9-පියවර-8-local-එකේ-test-කර-බැලීම-npm-link--demo)
10. [පියවර 9: NPM වෙත Publish කිරීම (Login, 2FA & Token)](#10-පියවර-9-npm-වෙත-publish-කිරීම-login-2fa--token)
11. [පියවර 10: අනාගතයේදී Update එකක් දාන ආකාරය (Versioning)](#11-පියවර-10-අනාගතයේදී-update-එකක්-දාන-ආකාරය-versioning)
12. [පොදු දෝෂ සහ විසඳුම් (Troubleshooting & FAQs)](#12-පොදු-දෝෂ-සහ-විසඳුම්-troubleshooting--faqs)

---

## 1. පූර්ව අවශ්‍යතා (Prerequisites)

වැඩේ පටන් ගන්න කලින් ඔබේ පරිගණකයේ මේවා සූදානම් කරගන්න:
1. **Node.js (v18 හෝ ඊට ඉහළ):** [nodejs.org](https://nodejs.org/) වෙතින් install කරගන්න. (Check: `node -v` සහ `npm -v`).
2. **NPM Account එකක්:** [npmjs.com](https://www.npmjs.com/) එකේ නොමිලේ ගිණුමක් සාදාගන්න (Sign up).
3. **VS Code (හෝ කැමති Code Editor එකක්)**.

---

## 2. පියවර 1: Project එක Initialize කරගැනීම

ඔබගේ package එක සඳහා අලුත් folder එකක් සාදා terminal එකෙන් ඒ තුළට යන්න:

```bash
mkdir my-awesome-package
cd my-awesome-package
```

Default `package.json` file එකක් create කරගන්න:
```bash
npm init -y
```

---

## 3. පියවර 2: Modern Build Tools Install කරගැනීම

වර්තමානයේ industry standard එක වන්නේ TypeScript වලින් code ලියා **CommonJS (CJS)** සහ **ES Modules (ESM)** යන දෙකටම compile කිරීමයි.

මේ සඳහා අවශ්‍ය dev dependencies install කරගන්න:

```bash
npm install -D typescript tsup vitest
```

- **`typescript`**: Type checking සහ `.d.ts` types generate කිරීමට.
- **`tsup`**: ESBuild මත පදනම් වූ ultra-fast bundler එකක් (CJS, ESM, bundle & minify සඳහා).
- **`vitest`**: Jest වලට වඩා 10x වේගවත් modern unit testing framework එක.

---

## 4. පියවර 3: TypeScript Configuration (`tsconfig.json`)

Project root එකේ `tsconfig.json` නමින් file එකක් සාදා පහත code එක දමන්න:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## 5. පියවර 4: `package.json` නිවැරදිව Configure කිරීම (CJS + ESM)

Modern libraries වල පැරණි `require()` සහ අලුත් `import` දෙකම වැඩ කළ යුතුයි. `package.json` එක පහත ආකාරයට සකසන්න:

```json
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "description": "A short and meaningful description of your package",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --clean",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "test": "vitest run",
    "prepublishOnly": "npm run test && npm run build"
  },
  "keywords": [
    "utility",
    "tools"
  ],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "devDependencies": {
    "tsup": "^8.0.2",
    "typescript": "^5.4.5",
    "vitest": "^1.6.0"
  }
}
```

> ⚠️ **ඉතා වැදගත්:**  
> - `"files": ["dist"]` දැමීමෙන් npm publish වෙද්දී build වුණු `dist` folder එක පමණක් upload වන අතර source files හෝ config files අනවශ්‍ය ලෙස upload වීම වළකී.
> - `"prepublishOnly": "npm run test && npm run build"` දැමූ විට, ඔබ publish කරන්න හදන සෑම විටම ස්වයංක්‍රීයව tests run වී build එක හැදී ආරක්ෂිතව publish වේ.

---

## 6. පියවර 5: Folder Structure & Source Code ලිවීම

පහත ආකාරයට folder structure එක සකසා ගන්න:

```text
my-awesome-package/
 ├── src/
 │    ├── index.ts          # Main Export File
 │    └── index.test.ts     # Unit Tests File
 ├── .gitignore
 ├── LICENSE                # MIT License
 ├── package.json
 ├── tsconfig.json
 └── README.md
```

### `.gitignore` සෑදීම:
```text
node_modules/
dist/
*.log
.DS_Store
```

### `src/index.ts` හි ඔබේ Functions ලිවීම:
```typescript
/**
 * Simple greeting helper function
 */
export function greet(name: string): string {
  if (!name) return 'Hello, World!';
  return `Hello, ${name.trim()}!`;
}

/**
 * Add two numbers
 */
export function add(a: number, b: number): number {
  return a + b;
}
```

---

## 7. පියවර 6: Unit Testing (Vitest)

හොඳ library එකක අනිවාර්යයෙන්ම Unit tests තිබිය යුතුය. `src/index.test.ts` සාදන්න:

```typescript
import { describe, it, expect } from 'vitest';
import { greet, add } from './index.js';

describe('My Awesome Package', () => {
  it('greets properly', () => {
    expect(greet('Ravi')).toBe('Hello, Ravi!');
    expect(greet('')).toBe('Hello, World!');
  });

  it('adds numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
});
```

Tests run කරන්න:
```bash
npm test
```
සියලුම tests කොළ පැහැයෙන් **`✓ PASS`** විය යුතුය.

---

## 8. පියවර 7: Build කිරීම (`tsup`)

TypeScript code එක JavaScript වලට bundle කිරීමට පහත command එක run කරන්න:

```bash
npm run build
```

මෙයින් පසු project root එකේ **`dist/`** නමින් folder එකක් හැදෙන අතර, ඒ තුළ:
- **`index.js`** ➡️ CommonJS (`require`)
- **`index.mjs`** ➡️ ES Module (`import`)
- **`index.d.ts`** ➡️ TypeScript Type definitions
ස්වයංක්‍රීයව generate වේ.

---

## 9. පියවර 8: Local එකේ Test කර බැලීම

Publish කරන්න කලින් ඔබේ පරිගණකයේම මේක වෙනත් project එකක දාලා බලන්න පුළුවන් ක්‍රම 2ක් තියෙනවා:

### ක්‍රමය A: Demo script එකකින් (`demo.ts`):
Root එකේ `demo.ts` file එකක් හදලා `npx tsx demo.ts` run කර terminal එකේ output එක බැලීම.

### ක්‍රමය B: `npm link` මඟින් සැබෑ project එකක test කිරීම:
1. මේ package folder එක ඇතුළේ run කරන්න:
   ```bash
   npm link
   ```
2. වෙනත් React / Node project එකකට ගොස් run කරන්න:
   ```bash
   npm link my-awesome-package
   ```
   දැන් සාමාන්‍ය install කරපු library එකක් වගේම import කර test කළ හැක!

---

## 10. පියවර 9: NPM වෙත Publish කිරීම 🚀

මෙන්න වඩාත්ම වැදගත් පියවර!

### 1️⃣ NPM Account එකට Login වීම:
Terminal එකේ run කරන්න:
```bash
npm login
```
ඔබගේ Username, Password සහ Email එකට එන OTP එක ලබා දෙන්න.

---

### 2️⃣ 2FA Error එක (E403) මගහරවා ගැනීම:
NPM විසින් දැන් **Two-Factor Authentication (2FA)** අනිවාර්ය කර ඇත. Publish කරද්දී `E403 2FA is required` ආවොත් විසඳුම් 2ක් ඇත:

#### විකල්ප A: Phone Authenticator OTP එක සමඟ Publish කිරීම (පහසුම ක්‍රමය):
ඔබගේ NPM settings වල 2FA (Google Authenticator) සක්‍රීය කර ඇත්නම්:
```powershell
npm publish --access public --otp=123456
```
*(මෙහි `123456` වෙනුවට ඔබගේ Phone එකේ ඒ මොහොතේ පෙන්වන ඉලක්කම් 6 ලබා දෙන්න).*

#### විකල්ප B: Classic Automation Token එකක් මඟින්:
1. [npmjs.com](https://www.npmjs.com) ➡️ Profile icon ➡️ **Access Tokens**.
2. **Generate New Token** ➡️ **Classic Token** (Granular නොව) තෝරන්න.
3. Type එකට **"Automation"** යන්න තෝරා generate කර Copy කරගන්න.
4. Terminal එකේ මෙසේ run කරන්න:
   ```powershell
   npm config set //registry.npmjs.org/:_authToken "npm_YOUR_TOKEN_HERE"
   ```
5. ඉන්පසු publish කරන්න:
   ```powershell
   npm publish --access public
   ```

---

### 3️⃣ Package Name එක Already Taken නම් කුමක් කරන්නේද?
ඔබ තෝරාගත් නම දැනටමත් කවුරුහරි අරගෙන තිබුණොත්, `package.json` එකේ name එක ඔබගේ npm username එක prefix එකක් ලෙස දමා **Scoped Package** එකක් කරන්න:

```json
"name": "@your-npm-username/my-awesome-package"
```

ඉන්පසු run කරන්න:
```bash
npm publish --access public
```

---

## 11. පියවර 10: අනාගතයේදී Update එකක් දාන ආකාරය (Complete Update Workflow)

ඔබ දැනටමත් NPM එකට `1.0.0` version එක publish කර අවසන්. අනාගතයේදී ඔබ bug එකක් fix කළ විට, අලුත් function එකක් එකතු කළ විට, හෝ breaking change එකක් කළ විට අලුත් version එකක් NPM එකට දාන **සම්පූර්ණ පියවර 7** මෙන්න:

---

### 🔢 1. Semantic Versioning (SemVer) තේරුම් ගනිමු

NPM එකේ version අංකය හැදෙන්නේ කොටස් 3කිනි: `MAJOR.MINOR.PATCH` (උදා: `1.0.0`)

| Version Type | කවදාද භාවිතා කරන්නේ? | උදාහරණය | Command |
| :--- | :--- | :--- | :--- |
| **PATCH** (Bug Fixes) | Function එකක කුඩා bug එකක් fix කළ විට, typo එකක් හැදූ විට (පැරණි code එකට කිසිදු හානියක් නැත). | `1.0.0` ➡️ `1.0.1` | `npm version patch` |
| **MINOR** (New Feature) | අලුතින් feature එකක් හෝ අලුත් function එකක් එකතු කළ විට (පැරණි code ඒ විදියටම වැඩ කරයි). | `1.0.0` ➡️ `1.1.0` | `npm version minor` |
| **MAJOR** (Breaking Change) | පැරණි function එකක නමක් වෙනස් කිරීම, function parameters සම්පූර්ණයෙන්ම වෙනස් කිරීම වැනි පැරණි users ලාගේ code කැඩෙන වෙනස්කම්. | `1.0.0` ➡️ `2.0.0` | `npm version major` |

---

### 🛠️ 2. අලුත් Update එකක් දාන පියවරෙන් පියවර Workflow එක:

#### පියවර 1: Code එක වෙනස් කිරීම
`src/` folder එක ඇතුළේ ඇති code එකට අවශ්‍ය fixes හෝ අලුත් features එකතු කර Save කරන්න.

#### පියවර 2: Unit Tests Update කිරීම
අලුතින් එකතු කළ feature එකට හෝ bug fix එකට අදාළව `src/index.test.ts` එකේ tests ලියන්න.

#### පියවර 3: Tests Run කර බලන්න (අනිවාර්යයි!)
Publish කිරීමට පෙර සියලුම tests pass වන බව තහවුරු කරගන්න:
```bash
npm test
```

#### පියවර 4: `README.md` Update කිරීම
අලුතින් එකතු කළ function එක පාවිච්චි කරන ආකාරය (Code example එකක්) `README.md` එකට එකතු කරන්න.

#### පියවර 5: Version එක Bump කිරීම (ස්වයංක්‍රීයව)
> ⚠️ **අවවාදයයි:** `package.json` එක open කර version අංකය අතින් වෙනස් කරන්න එපා!  
> ඒ වෙනුවට Terminal එකේ පහතින් ගැලපෙන command එක run කරන්න:

```bash
# Bug fix එකක් නම්:
npm version patch

# අලුත් feature එකක් නම්:
npm version minor

# Breaking changes සහිත විශාල update එකක් නම්:
npm version major
```
*මෙම command එක run කළ විට `package.json` සහ `package-lock.json` වල version එක auto-update වී, git commit එකක් සහ git tag එකක්ද ස්වයංක්‍රීයව සෑදේ.*

#### පියවර 6: Git එකට Push කිරීම (Git Tags සමඟ)
```bash
git push origin main --tags
```

#### පියවර 7: අලුත් Version එක NPM එකට Publish කිරීම 🚀
Terminal එකේ run කරන්න:
```powershell
# OTP එක සමඟ (2FA සක්‍රීය නම්):
npm publish --access public --otp=123456

# හෝ Automation Token එකක් set කර ඇත්නම්:
npm publish --access public
```

අපගේ `package.json` එකේ ඇති `"prepublishOnly": "npm run test && npm run build"` script එක නිසා, publish වීමට පෙර ස්වයංක්‍රීයව:
1. `npm run test` run වී tests pass දැයි බලයි.
2. `npm run build` run වී අලුත් `dist/` bundle එක compile වේ.
3. අලුත් version එක NPM එකට live වේ!

---

### 📥 3. Users ලා අලුත් Update එක ලබාගන්නේ කෙසේද?

ඔබගේ package එක පාවිච්චි කරන developers ලාට තමන්ගේ project එකේ terminal එකේ:
```bash
npm update my-awesome-package
# හෝ
npm install my-awesome-package@latest
```
run කිරීමෙන් ඔබ නිකුත් කළ අලුත්ම version එක ක්ෂණිකව ලබාගත හැක.

---

### 🚨 4. Emergency: වැරදි Version එකක් Publish වුණොත් කුමක් කළ යුතුද?

යම් හෙයකින් bug එකක් සහිත version එකක් publish වුණොත්, NPM එකෙන් package එක සම්පූර්ණයෙන්ම delete කිරීමට නොහැක (එය අන් අයගේ projects බිඳ වැටීමට හේතු විය හැක). 

ඒ වෙනුවට කළ යුත්තේ:
1. **Warning එකක් දැමීම (Deprecate):**
   ```bash
   npm deprecate my-awesome-package@1.0.1 "This version has a known bug. Please upgrade to 1.0.2"
   ```
2. ඉක්මනින් bug එක fix කර `npm version patch` (උදා: `1.0.2`) දමා නැවත publish කිරීමයි.

---

## 12. පොදු දෝෂ සහ විසඳුම් (Troubleshooting & FAQs)

| Error Code | හේතුව | විසඳුම |
| :--- | :--- | :--- |
| **`E403 Forbidden - 2FA required`** | NPM එකේ 2FA publish restriction එකක් තිබීම | `--otp=XXXXXX` flag එක යොදන්න හෝ Classic Automation Token එකක් පාවිච්චි කරන්න. |
| **`E403 Forbidden - You do not have permission`** | Package name එක දැනටමත් NPM එකේ වෙනත් අයෙකු විසින් ලියාපදිංචි කර තිබීම | `package.json` එකේ නම `@your-username/package-name` ලෙස වෙනස් කරන්න. |
| **`dist/index.js not found`** | Build එක compile නොවී publish කිරීමට උත්සාහ කිරීම | Publish කිරීමට පෙර `npm run build` run කරන්න (හෝ `prepublishOnly` script එක තබන්න). |
| **`Cannot use import statement outside a module`** | ESM සහ CJS exports නිවැරදිව configure නොවීම | `package.json` එකේ `"exports"` සහ `"type"` definitions නිවැරදි දැයි බලන්න. |

---

## 🏆 Checklist: Publish කිරීමට පෙර අවසන් පිරික්සුම

- [ ] `npm test` run කර සියලුම tests pass වී ඇත්දැයි බැලුවාද?
- [ ] `npm run build` run කර `dist/` folder එක නිවැරදිව හැදුනාද?
- [ ] `README.md` එකේ package එක පාවිච්චි කරන ආකාරය (Installation & Examples) පැහැදිලිව ලියා ඇත්ද?
- [ ] `LICENSE` (MIT) file එකක් root එකේ තිබේද?
- [ ] `.gitignore` එකේ `node_modules/` සහ `dist/` දමා ඇත්ද?
- [ ] `package.json` එකේ `"files": ["dist"]` සඳහන් කර ඇත්ද?

---

**Made with ❤️ for Sri Lankan & Global Developers.**  
*මෙම Guide එක ඕනෑම කෙනෙකුට share කළ හැකි අතර, අනාගතයේදී ඔබ හදන ඕනෑම NPM package එකකට Template එකක් ලෙස භාවිතා කළ හැක!*


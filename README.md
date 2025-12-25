# 🎭 Playwright Test Framework

A lightweight E2E test automation framework with Playwright and TypeScript.

## ✨ Features

- ✅ Page Object Model (POM)
- ✅ Authentication setup with storage state
- ✅ Auto cleanup after tests
- ✅ TypeScript support
- ✅ Parallel execution
- ✅ HTML reports

## 📁 Structure

```
src/
├── config/config.ts       # Configuration
├── pages/                 # Page Objects
├── tests/                 # Test files
│   └── auth.setup.ts      # Auth setup
└── utils/utils.ts         # Helpers

playwright.config.ts       # Playwright config
global-teardown.ts         # Cleanup script
.env                       # Credentials (NOT committed)
```

## 🚀 Quick Start

### Install
```bash
npm install
npx playwright install
```

### Setup
Create `.env`:
```
URL=https://example.com
USERNAME=test_user
PASSWORD=test_password
```

### Run Tests
```bash
npm run test              # Run all
npm run test:headed       # With browser
npm run test:debug        # Debug mode
npm run test:ui           # Interactive UI
npm run test:show-report  # View report
```

## 📚 Commands

```bash
npm run test              # Run tests
npm run test:headed       # Headed mode
npm run test:debug        # Debug
npm run test:ui           # UI mode
npm run test:tags         # Tagged tests
npm run test:serial       # Sequential
npm run test:parallel     # Parallel
npm run test:lastfailed   # Re-run failed
npm run lint              # ESLint
npm run format            # Prettier
npm run clean             # Clean up
```

## 🏗️ How It Works

1. **auth.setup.ts** runs once → logs in → saves session
2. **Tests** run with saved session (no login needed)
3. **global-teardown.ts** runs → cleans up auth state

## 🔐 Security

- `.env` is in `.gitignore` (not committed)
- Use dedicated test account
- Update credentials regularly

## 📖 Resources

- [Playwright Docs](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)

**Happy Testing! 🎉**

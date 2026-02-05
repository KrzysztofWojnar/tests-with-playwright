# E2E Testing with CodeceptJS + Gherkin

This project contains end-to-end tests using CodeceptJS with Gherkin, Playwright for UI testing and REST helper for API testing.

## Setup

### Prerequisites

- Node.js 24 (possibly any node 18+) 
- npm (or yarn)

### Installation

```bash
npm install
```

## Building and Running Tests

### Quick Start

Run the preparation script to build and setup everything:

```bash
bash scripts/prepare-e2e.sh
```

This will:
1. Compile TypeScript (`npm run build`)
2. Copy feature files to dist directory
3. Prepare the environment for test execution

### Running Tests

After preparation, run tests from the root directory:

```bash
# Run all tests
npx codeceptjs run --config dist/codecept.conf.js

# Run only REST API tests
npx codeceptjs run --config dist/codecept.conf.js --grep "REST API"

# Run only UI tests (SauceDemo)
npx codeceptjs run --config dist/codecept.conf.js --grep "Saucedemo"

# Run with debug output
npx codeceptjs run --config dist/codecept.conf.js --debug

# Run in headless mode
HEADLESS=true npx codeceptjs run --config dist/codecept.conf.js

# Interactive interactive mode (watch tests)
npx codeceptjs run --config dist/codecept.conf.js --watch
```

### Environment Variables

- `HEADLESS=true` - Run browser tests in headless mode (default: false)

## Output

Test results and artifacts are stored in:

```
./dist/output/         # Screenshots and test reports
./dist/output/*.png    # Failed test screenshots
./playwright-report/   # Detailed Playwright reports
```

## Troubleshooting

### "Module not found" errors

Ensure you've run the prepare script:
```bash
bash scripts/prepare-e2e.sh
```

### Features not found

Verify feature files are copied to dist:
```bash
ls dist/features/
```

If missing, copy manually:
```bash
cp -r features dist/
```

### TypeScript compilation errors

Check that all required types are installed:
```bash
npm install
```

### REST helper methods not recognized

REST methods are dynamically injected by CodeceptJS. Ensure the REST helper is enabled in `codecept.conf.ts`.

## Notes

- All timestamps are in milliseconds (ms)

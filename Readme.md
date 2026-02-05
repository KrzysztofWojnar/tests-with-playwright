# Unnamed testing project

This repository contains only tests, utilizing Playwright for robust, cross-browser testing and API validation.

## 🚀 Getting Started

Follow these steps to set up the environment and run the tests locally.
1. First, install the necessary Node.js dependencies:
    ```
    npm install
    ```

2. Install the specific browser binaries required for the tests (Chromium and Firefox in our case):
    ```
    npx playwright install chromium firefox
    ```
## 🧪 You can run the all tests or target specific browsers and environments using the scripts below.

| Command                 | description    |
| :---------------------- |:---------------|
| `npm run e2e`           | Runs all the tests. UI tests run against chromium |
| `npm run e2e:chromium`  | Runs only UI tests against chromium |
| `npm run e2e:api-tests` | Runs only REST API tests            |
| `npm run e2e:trace-all` | Runs only UI tests against chromium and keeps all the playwright trace data |

## 📊 Reports and Debugging
  -  "Line" Report: The testing progress should be displayed in the console.

  -  HTML Report: After a test run, Playwright typically generates a report. You can usually view it by running `npx playwright show-report`.
  
  - Trace Viewer: If a test fails, check the test-results folder for trace   files to debug the execution flow.

  - Custom files: One of the tests creates an output. It should be generated in `test-results` directory

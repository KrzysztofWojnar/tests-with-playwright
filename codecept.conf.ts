import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';

setHeadlessWhen(process.env.HEADLESS);
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './step_definitions/**/*.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: 'https://www.saucedemo.com',
      show: true,
      browser: 'chromium',
      waitForAction: 500,
      trace: true,
    },
    REST: {
      endpoint: 'https://dummyjson.com',
    },
  },
  include: {
    I: './step_definitions/steps.ts',
  },
  mocha: {},
  gherkin: {
    features: './features/**/*.feature',
    steps: [
      './step_definitions/steps.ts',
      './step_definitions/ui-steps.ts',
      './step_definitions/api-steps.ts',
    ],
  },
  name: 'unnamed-testing-project',
};

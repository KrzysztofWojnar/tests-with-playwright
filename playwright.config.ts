import {
  defineConfig,
  devices,
  ScreenshotMode,
  TraceMode,
  VideoMode,
} from '@playwright/test';
import 'dotenv/config';

const validPolicies = {
  screenshot: [
    'off',
    'on',
    'only-on-failure',
    'on-first-failure',
  ] as const satisfies ScreenshotMode[],
  trace: [
    'off',
    'on',
    'retain-on-failure',
    'on-first-retry',
    'on-all-retries',
    'retain-on-first-failure',
  ] as const satisfies TraceMode[],
  video: ['off', 'on', 'retain-on-failure'] as const satisfies VideoMode[],
} as const;

export default defineConfig({
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    screenshot: getValidPolicyMode('screenshot', 'PW_SCREENSHOT') || 'on',
    trace: getValidPolicyMode('trace', 'PW_TRACE') || 'on-first-retry',
    video: getValidPolicyMode('video', 'PW_VIDEO') || 'off',
    testIdAttribute: 'data-test',
  },

  projects: [
    {
      name: 'chromium',
      testDir: './ui-tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
    },

    {
      name: 'firefox',
      testDir: './ui-tests',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://www.saucedemo.com',
      },
    },
    {
      name: 'api-tests',
      testDir: './api-tests',
      use: {
        baseURL: 'https://www.xyz.com',
        screenshot: 'off',
        video: 'off',
      },
    },
  ],
});

interface PolicyTypes {
  screenshot: ScreenshotMode;
  trace: TraceMode;
  video: VideoMode;
}

function getValidPolicyMode<T extends keyof typeof validPolicies>(
  policySubject: T,
  envKey: string
): PolicyTypes[T] | undefined {
  const value = process.env[envKey];
  if (!value) return;

  const allowedValues = validPolicies[policySubject] as PolicyTypes[T][];
  if (allowedValues.includes(value as PolicyTypes[T])) {
    return value as PolicyTypes[T];
  }
  throw new Error(`"${value}" value is not valid for ${policySubject} policy!`);
}

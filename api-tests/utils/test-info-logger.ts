import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'path';

/**
 * An util for saving data from a api scenario 1 test run
 */
export async function saveTestInfo(testinfo: string) {
  test.info().annotations.push({ type: 'custom data', description: testinfo });

  const filePath = path.join(
    process.cwd(),
    'test-results',
    'api-scenario-1-output.txt'
  );
  await fs.writeFile(filePath, testinfo, 'utf8');
}

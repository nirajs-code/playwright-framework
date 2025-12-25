import { chromium, FullConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const STORAGE_STATE = 'playwright/.auth/state.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function globalSetup(config: FullConfig) {

  const authDir = path.dirname(STORAGE_STATE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log(`Created directory: ${authDir}`);
  }

  const baseURL = process.env.URL;
  const timeout = 20000;

  if (!baseURL) {
    throw new Error('URL not found in .env file. Please set URL in the environment.');
  }

  // Launch browser and perform login
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log(`Navigating to ${baseURL}...`);
    await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

    // Accept cookies if present
    try {
      const acceptButton = page.getByRole('button', { name: 'Accept' });
      await acceptButton.waitFor({ state: 'visible', timeout: timeout });
      console.log('Accepting cookies...');
      await acceptButton.click();
      await page.waitForTimeout(1000);
      console.log('Cookies accepted');
    } catch {
      console.log('Cookie button not found, continuing...');
    }

  } finally {
    await context.close();
    await browser.close();
    console.log('Global setup completed');
  }
}

export default globalSetup;

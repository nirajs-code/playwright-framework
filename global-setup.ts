import { chromium, FullConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const STORAGE_STATE = 'playwright/.auth/state.json';

async function globalSetup(config: FullConfig) {

  const authDir = path.dirname(STORAGE_STATE);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log(`Created directory: ${authDir}`);
  }

  // Get credentials from environment
  const baseURL = process.env.URL;
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!baseURL) {
    throw new Error('URL not found in .env file. Please set URL in the environment.');
  }

  if (!username || !password) {
    throw new Error('USERNAME or PASSWORD not found in .env file. Please set both environment variables.');
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
      await acceptButton.waitFor({ state: 'visible', timeout: 5000 });
      console.log('Accepting cookies...');
      await acceptButton.click();
      await page.waitForTimeout(1000);
      console.log('Cookies accepted');
    } catch (e) {
      console.log('Cookie button not found, continuing...');
    }

    // Click on Account & Lists to navigate to login
    console.log('Logging in...');
    const accountLink = page.getByRole('link', { name: 'Account & Lists' });
    await accountLink.waitFor({ state: 'visible', timeout: 10000 });
    await accountLink.click();

    // Wait for sign-in page to load
    await page.waitForLoadState('domcontentloaded');

    // Fill in username/email
    const emailInput = page.getByRole('textbox', { name: 'Enter mobile number or email' });
    await emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await emailInput.fill(username);

    // Click Continue button
    const continueButton = page.getByRole('button', { name: 'Continue' });
    await continueButton.click();

    // Fill in password
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 });
    await passwordInput.fill(password);

    // Click Sign in button
    const signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
    await signInButton.click();

    // Wait for navigation to complete
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    console.log('Login successful');

    // Save the authentication state
    await context.storageState({ path: STORAGE_STATE });
    console.log(`Storage state saved to ${STORAGE_STATE}`);
  } finally {
    await context.close();
    await browser.close();
    console.log('Global setup completed');
  }
}

export default globalSetup;

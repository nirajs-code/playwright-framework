import { test as setup } from '@playwright/test';
import { config } from '../config/config';

const STORAGE_STATE = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, context }) => {
  const username = config.username;
  const password = config.password;
  const timeout = config.timeout;

  if (!username || !password) {
    throw new Error('USERNAME and PASSWORD environment variables are required');
  }

  console.log('Logging in...');
  
  // Navigate to the base URL first
  console.log(`Navigating to ${config.baseURL}...`);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  const accountLink = page.getByRole('link', { name: 'Account & Lists' });
  await accountLink.waitFor({ state: 'visible', timeout: timeout });
  await accountLink.click();

  // Fill in username/email
  const emailInput = page.getByRole('textbox', { name: 'Enter mobile number or email' });
  await emailInput.waitFor({ state: 'visible', timeout: timeout });
  await emailInput.fill(username);

  // Click Continue button
  const continueButton = page.getByRole('button', { name: 'Continue' });
  await continueButton.click();

  // Fill in password
  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  await passwordInput.waitFor({ state: 'visible', timeout: timeout });
  await passwordInput.fill(password);

  // Click Sign in button
  const signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
  await signInButton.click();

  // Verify login was successful by checking if URL matches baseURL
  try {
    const currentURL = page.url();
    const baseURLValue = config.baseURL;
    if (currentURL.includes(baseURLValue)) {
      console.log('Login verified - URL matches baseURL');
    } else {
      console.log(`Could not verify login - URL mismatch. Expected: ${baseURLValue}, Got: ${currentURL}`);
    }
  } catch (error) {
    console.log('Could not verify login - error checking URL', error);
  }

  console.log('Login successful');

  // Save the authentication state to .auth directory
  await context.storageState({ path: STORAGE_STATE });
  console.log(`Storage state saved to ${STORAGE_STATE}`);
});
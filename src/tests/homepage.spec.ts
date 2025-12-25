import { test, expect } from '@playwright/test';
import { Homepage } from 'src/pages/homePage';

let homepage: Homepage;

test.describe('Homepage Tests', () => {

  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

  test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await homepage.navigateToHomePage();
    try {
      const acceptButton = page.getByRole('button', { name: 'Accept' });
      const isVisible = await acceptButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        await homepage.acceptCookies();
      }
    } catch {
      console.log('cookies not found, skip cookie acceptance');
    }
  });

  test('Verify homepage title', {
    tag: '@homepageTitle',
    annotation: {
      type: 'AlwaysRun',
      description: 'This is to ensure the homepage title is always checked, regardless of other test conditions.',
    },
    }, async ({ page }) => {
      await expect(page).toHaveTitle('Amazon.co.uk: Low Prices in Electronics, Books, Sports Equipment & more');
  });

  test('Verify user is already logged in', {
    tag: '@testauthsetup',
    }, async ({ page }) => {
    const signInLink = page.getByRole('link', { name: 'Hello, sign in' });
    await expect(signInLink).not.toBeVisible();
  });

});
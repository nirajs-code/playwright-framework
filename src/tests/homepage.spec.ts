import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Homepage Tests', () => {

  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

  test.beforeEach(async ({ homePage, page }) => {
    // await homePage.navigateToHomePage();
    try {
      const acceptButton = page.getByRole('button', { name: 'Accept' });
      const isVisible = await acceptButton.isVisible({ timeout: 2000 }).catch(() => false);
      if (isVisible) {
        await homePage.acceptCookies();
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
      await expect(page).toHaveTitle(testData.expectedTexts.homepage.title);
  });

  test('Verify user is already logged in', {
    tag: '@testauthsetup',
    }, async ({ page }) => {
    const signInLink = page.getByRole('link', { name: 'Hello, sign in' });
    await expect(signInLink).not.toBeVisible();
  });

});
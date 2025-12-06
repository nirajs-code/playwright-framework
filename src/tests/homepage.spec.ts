import { test, expect } from '@playwright/test';
import { Homepage } from '../pages/homepage';

let homepage: Homepage;


test.beforeEach(async ({ page }) => {
  await page.goto('/');
  homepage = new Homepage(page);
  await homepage.acceptCookies();
});

test('has title', async ({ page }) => {
  await expect(page).toHaveTitle('Amazon.co.uk: Low Prices in Electronics, Books, Sports Equipment & more');
});

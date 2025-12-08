import test from "@playwright/test";
import { Homepage } from "../pages/homepage";
import { LoginPage } from "../pages/loginPage";

let homepage: Homepage;
let loginPage: LoginPage;

test.describe('Login Page Tests', () => {
    test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        homepage = new Homepage(page);
        await homepage.acceptCookies();
    });

    test('Verify navigate to login page', {tag: '@login'}, async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.clickAccountAndLists();
        //   await loginPage.clickSignIn();
        const isVisible =  await loginPage.isSignInHeadingVisible();
        test.expect(isVisible).toBeTruthy();
    });
    
});

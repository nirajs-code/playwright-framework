import test from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { Homepage } from "src/pages/homePage";

let homepage: Homepage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    homepage = new Homepage(page);
    await homepage.navigateToHomePage();
    await homepage.acceptCookies();
});

test('Verify navigate to login page', {tag: '@login1'}, async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.clickAccountAndLists();
    const isVisible =  await loginPage.isSignInHeadingVisible();
    test.expect(isVisible).toBeTruthy();
});

test('User is able to login with valid credentials', {tag: '@login2'}, async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.clickAccountAndLists();
    await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
});
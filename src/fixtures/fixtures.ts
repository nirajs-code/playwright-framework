import { test as base } from '@playwright/test';
import { Homepage } from "src/pages/homePage";
import { LoginPage } from "src/pages/loginPage";


type MyFixtures = {
    homePage: Homepage;
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
    page: async ({ page }, use) => {
        await page.goto('/', {
            waitUntil: 'domcontentloaded'
        });
        await use(page);
    },
    homePage: async ({ page }, use) => {
        const homePage = new Homepage(page);
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
});

export { expect } from '@playwright/test';
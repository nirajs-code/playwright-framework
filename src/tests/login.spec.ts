import { testData } from 'src/data/testData';
import { test } from '../fixtures/fixtures';

test.beforeEach(async ({ homePage }) => {
    await homePage.acceptCookies();
});

test('Verify navigate to login page', {tag: '@login1'}, async ({ loginPage }) => {
    await loginPage.clickAccountAndLists();
    const isVisible =  await loginPage.isSignInHeadingVisible();
    test.expect(isVisible).toBeTruthy();
});

test('User is able to login with valid credentials', {tag: '@login2'}, async ({ loginPage }) => {
    await loginPage.clickAccountAndLists();
    await loginPage.login(testData.users.validUser.username, testData.users.validUser.password);
});
import { Locator, Page } from "@playwright/test";

export class LoginPage {

    private readonly accountAndListsLink: Locator;
    private readonly signInLink: Locator;
    private readonly signInHeading: Locator;

    constructor(readonly page: Page) {
        this.accountAndListsLink = this.page.getByRole("link", { name: "Account & Lists" });
        this.signInLink = this.page.getByRole("link", { name: "Hello, sign in" });
        // Match "Sign in" with any amount of whitespace/newlines
        this.signInHeading = this.page.getByRole("heading", { name: /Sign\s+in/i });
    }

    public async clickAccountAndLists(): Promise<void> {
        await this.accountAndListsLink.waitFor({ state: 'visible', timeout: 10000 });
        await this.accountAndListsLink.click();
    }

    public async clickSignIn(): Promise<void> {
        await this.signInLink.click();
    }

    public async isSignInHeadingVisible(): Promise<boolean> {
        try {
            await this.signInHeading.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (e) {
            return false;
        }
    }

}
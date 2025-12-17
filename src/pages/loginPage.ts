import { Locator, Page } from "@playwright/test";

export class LoginPage {

    private readonly accountAndListsLink: Locator;
    private readonly signInLink: Locator;
    private readonly signInHeading: Locator;
    private readonly userInput: Locator;
    private readonly continueButton: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator; 

    constructor(readonly page: Page) {
        this.accountAndListsLink = this.page.getByRole("link", { name: "Account & Lists" });
        this.signInLink = this.page.getByRole("link", { name: "Hello, sign in" });
        this.signInHeading = this.page.getByRole("heading", { name: /Sign\s+in/i });
        this.userInput = this.page.getByRole('textbox', { name: 'Enter mobile number or email' })
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.signInButton = page.getByRole('button', { name: 'Sign in', exact: true });
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

    public async login(username: string | undefined, password: string | undefined): Promise<void> {
        await this.userInput.fill(username || '');
        await this.continueButton.click();
        await this.passwordInput.fill(password || '');
        await this.signInButton.click();
    }

}
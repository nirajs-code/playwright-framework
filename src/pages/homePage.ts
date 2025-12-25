import { Locator, Page } from '@playwright/test';
import { click } from '../utils/utils';

interface Locators {
    acceptCookiesButton: Locator;
    // headerNavLinks: (linkText: string) => Locator;
}

export class Homepage {

    constructor(readonly page: Page) {}

    public locators(): Locators  {
        return {

            acceptCookiesButton: this.page.getByRole("button", { name: "Accept" }),

            // headerNavLinks: (linkText: string) => {
            //     return this.page.getByRole("heading", { name: `${linkText}` });
            // }
        };
    }

    public async acceptCookies(): Promise<void> {
        try {
            const acceptButton = this.locators().acceptCookiesButton;
            await acceptButton.waitFor({ state: 'visible', timeout: 5000 });
            await click(acceptButton);
        } catch {
            console.log('Cookie button not found, skipping...');
        }
    }

    // public async navigateToHomePage() : Promise<void> {
    //     await this.page.goto('/', {
    //         waitUntil: 'domcontentloaded'
    //     });
    // }
}
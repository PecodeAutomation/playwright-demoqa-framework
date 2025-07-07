import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../pages/BasePage';

export class HeaderComponent extends BasePage{
  private logo: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    super(page)
    this.logo = page.locator('img[src="/images/Toolsqa.jpg"]');
    this.loginButton = page.locator('button[id="login"]');
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async verifyMainLogo(): Promise<boolean> {
    return await this.logo.isVisible();
  }
}
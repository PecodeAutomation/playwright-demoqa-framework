import { expect, Locator, Page } from "@playwright/test";

export class HeaderComponent {
  private readonly page: Page;
  readonly logo: Locator;
  readonly bannerImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('header img');
    this.bannerImage = page.locator('header img[src="/images/Toolsqa.jpg"]');
  }

  async verifyComponent() {
    await expect(this.logo).toBeVisible();
    await expect(this.bannerImage).toBeVisible();
  }
}

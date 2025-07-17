import { Locator, Page, expect } from "@playwright/test";

export class RightSideAdvertisementComponent {
  private readonly page: Page;
  readonly banner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.banner = page.locator("#RightSide_Advertisement");
  }

  async verifyComponent() {
    await expect(this.banner).toBeVisible();
  }
}

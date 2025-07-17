import { Locator, Page, expect } from "@playwright/test";

export class LeftPanelComponent {
  private readonly page: Page;
  readonly categories: Locator;
  readonly elementsGroup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categories = page.locator('.left-pannel');
    this.elementsGroup = page.locator('.element-group');
  }

  async verifyComponent() {
    await expect(this.categories).toBeVisible();
    await expect(this.elementsGroup).toHaveCount(6);
  }
}
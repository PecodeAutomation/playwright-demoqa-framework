import { Page, Locator } from '@playwright/test';

export class SidebarMenu {
  private readonly page: Page;
  private readonly menuItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuItems = page.locator('.menu-list li');
  }

  async clickMenuItem(itemName: string) {
    await this.menuItems.filter({ hasText: itemName }).click();
  }

  async getMenuItemsCount(): Promise<number> {
    return this.menuItems.count();
  }
}
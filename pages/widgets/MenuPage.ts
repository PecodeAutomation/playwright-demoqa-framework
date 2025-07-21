import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class MenuPage extends BasePage {
  private readonly mainItem1: Locator;
  private readonly mainItem2: Locator;
  private readonly mainItem3: Locator;
  private readonly subSubList: Locator;

  constructor(page: Page) {
    super(page);
    this.mainItem1 = page.locator('#nav li:has-text("Main Item 1")');
    this.mainItem2 = page.locator('#nav li:has-text("Main Item 2")');
    this.mainItem3 = page.locator('#nav li:has-text("Main Item 3")');
    this.subSubList = page.locator(
      '#nav li:has-text("Main Item 2") >> li:has-text("SUB SUB LIST")'
    );
  }

  async hoverOverMainItem1() {
    await this.mainItem1.hover();
  }

  async hoverOverMainItem2() {
    await this.mainItem2.hover();
  }

  async hoverOverMainItem3() {
    await this.mainItem3.hover();
  }

  async verifyMainItemsVisible() {
    await expect(this.mainItem1).toBeVisible();
    await expect(this.mainItem2).toBeVisible();
    await expect(this.mainItem3).toBeVisible();
  }

  async verifySubMenuAppears() {
    await this.hoverOverMainItem2();
    await expect(this.subSubList).toBeVisible();
  }

  async verifySubMenuDisappears() {
    await this.page.mouse.move(10, 10);
    await expect(this.subSubList).not.toBeVisible();
  }

  async verifyNoSubMenuForMainItem1() {
    await this.hoverOverMainItem1();
    await expect(this.subSubList).not.toBeVisible();
  }

  async verifyNoSubMenuForMainItem3() {
    await this.hoverOverMainItem3();
    await expect(this.subSubList).not.toBeVisible();
  }

  async verifyOnlyMainItem2HasSubmenu() {
    await this.verifyNoSubMenuForMainItem1();
    await this.verifySubMenuAppears();
    await this.verifyNoSubMenuForMainItem3();
  }
}

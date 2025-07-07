import { Page } from "@playwright/test";

export abstract class NavigationGroup {
  constructor(
    protected page: Page,
    protected groupName: string
  ) {}

  async expand() {
    await this.page
      .locator(`.card-body:has-text("${this.groupName}")`)
      .click();
  }

  async navigateTo(elementName: string) {
    await this.expand();
    await this.page
      .locator(
        `.element-group:has-text("${this.groupName}") .menu-list li:has-text("${elementName}")`
      )
      .click();
  }
}

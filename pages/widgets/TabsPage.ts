import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class TabsPage extends BasePage {
  private readonly tabWhat: Locator;
  private readonly tabOrigin: Locator;
  private readonly tabUse: Locator;
  private readonly tabMore: Locator;
  private readonly contentArea: Locator;

  constructor(page: Page) {
    super(page);
    this.tabWhat = page.locator("#demo-tab-what");
    this.tabOrigin = page.locator("#demo-tab-origin");
    this.tabUse = page.locator("#demo-tab-use");
    this.tabMore = page.locator("#demo-tab-more");
    this.contentArea = page.locator(".tab-content");
  }

  async switchToTab(tabName: "what" | "origin" | "use" | "more") {
    switch (tabName) {
      case "what":
        await this.tabWhat.click();
        break;
      case "origin":
        await this.tabOrigin.click();
        break;
      case "use":
        await this.tabUse.click();
        break;
      case "more":
        await this.tabMore.click();
        break;
    }
  }

  async getActiveTabContent(): Promise<string> {
    const activeContent = this.contentArea.locator(".fade.show.active");
    return (await activeContent.textContent())?.trim() || "";
  }

  async isTabEnabled(
    tabName: "what" | "origin" | "use" | "more"
  ): Promise<boolean> {
    const tab = this.getTabLocator(tabName);
    return !(await tab.getAttribute("class"))?.includes("disabled");
  }

  async verifyTabContentContains(tabName: string, expectedText: string) {
    const content = await this.getActiveTabContent();
    expect(content).toContain(expectedText);
  }

  async verifyTabIsActive(tabName: "what" | "origin" | "use" | "more") {
    const tab = this.getTabLocator(tabName);
    await expect(tab).toHaveClass(/active/);
  }

  async verifyTabIsDisabled(tabName: "what" | "origin" | "use" | "more") {
    const tab = this.getTabLocator(tabName);
    await expect(tab).toHaveClass(/disabled/);
    await expect(tab).toHaveAttribute("aria-disabled", "true");
  }

  private getTabLocator(tabName: string): Locator {
    return this.page.locator(`#demo-tab-${tabName}`);
  }
}

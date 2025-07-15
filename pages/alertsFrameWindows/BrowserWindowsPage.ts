import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class BrowserWindowsPage extends BasePage {
  private readonly newTabButton: Locator;
  private readonly newWindowButton: Locator;
  private readonly newWindowMessageButton: Locator;

  constructor(page: Page) {
    super(page);
    this.newTabButton = page.locator("#tabButton");
    this.newWindowButton = page.locator("#windowButton");
    this.newWindowMessageButton = page.locator("#messageWindowButton");
  }

  async verifyNewTabOpens(expectedUrl: string) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.newTabButton.click(),
    ]);

    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(expectedUrl);
    await newPage.close();
    return newPage;
  }

  async verifyNewWindowOpens(expectedUrl: string) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.newWindowButton.click(),
    ]);

    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(expectedUrl);
    await newPage.close();
    return newPage;
  }

  async verifyNewWindowWithMessage(text: string) {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.newWindowMessageButton.click(),
    ]);

    await newPage.waitForLoadState();
    
    const bodyLocator = newPage.locator("body");
    await expect(bodyLocator).toContainText(text);
    
    await newPage.close();
    return newPage;
  }
}
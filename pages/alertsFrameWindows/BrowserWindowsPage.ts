import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class BrowserWindowsPage extends BasePage {
  private readonly newTabButton = this.page.locator("#tabButton");
  private readonly newWindowButton = this.page.locator("#windowButton");
  private readonly newWindowMessageButton = this.page.locator(
    "#messageWindowButton"
  );

  async verifyNewTab(expectedUrlPart: string) {
    const newPage = await this.openNewTab();
    await this.verifyPageUrl(newPage, expectedUrlPart);
    await newPage.close();
  }

  async verifyNewWindow(expectedUrlPart: string) {
    const newPage = await this.openNewWindow();
    await this.verifyPageUrl(newPage, expectedUrlPart);
    await newPage.close();
  }

  async verifyMessageWindowText(expectedText: string) {
    const newPage = await this.openMessageWindow();
    await this.verifyPageContent(newPage, expectedText);
    await this.verifyPageUrl(newPage, "about:blank");
    await newPage.close();
  }

  async verifyAllButtons(
    tabUrl: string,
    windowUrl: string,
    expectedMessage: string
  ) {
    await this.verifyNewTab(tabUrl);
    await this.verifyNewWindow(windowUrl);
    await this.verifyMessageWindowText(expectedMessage);
  }

  private async openNewTab() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.newTabButton.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  private async openNewWindow() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.newWindowButton.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  private async openMessageWindow() {
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.newWindowMessageButton.click(),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  private async verifyPageUrl(page: Page, expectedUrlPart: string) {
    const url = page.url();
    if (!url.includes(expectedUrlPart)) {
      throw new Error(
        `Expected URL to contain '${expectedUrlPart}', but got '${url}'`
      );
    }
  }

  private async verifyPageContent(page: Page, expectedText: string) {
    const bodyContent = await page.locator("body").textContent();
    if (!bodyContent?.includes(expectedText)) {
      throw new Error(
        `Expected page to contain '${expectedText}', but got '${bodyContent}'`
      );
    }
  }
}

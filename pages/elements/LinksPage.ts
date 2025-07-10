import { expect, Locator, Page } from "@playwright/test";

export class LinksPage {
  private readonly page: Page;

  private readonly homeLink: Locator;
  private readonly homeDynamicLink: Locator;
  private readonly apiResponseText: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeLink = page.locator("#simpleLink");
    this.homeDynamicLink = page.locator("#dynamicLink");
    this.apiResponseText = page.locator("#linkResponse");
  }

  async clickHomeLink() {
    await this.homeLink.click();
  }

  async clickHomeDynamicLink() {
    await this.homeDynamicLink.click();
  }

  async verifyNewTabOpened(expectedUrl: string, timeout: number = 5000) {
    const newPagePromise = this.page
      .context()
      .waitForEvent("page", { timeout });
    const newPage = await newPagePromise;

    try {
      await newPage.waitForLoadState("domcontentloaded");
      await newPage.waitForLoadState("load");
      await newPage.waitForFunction(() => document.readyState === "complete");

      const actualUrl = newPage.url();
      expect(actualUrl).toContain(expectedUrl);

      return newPage;
    } catch (error) {
      await newPage.close();
      throw new Error(`Failed to verify new tab`);
    }
  }

  async verifyLinkResponse(
    linkName: string,
    expectedStatus: number,
    expectedStatusText: string
  ) {
    const [response] = await Promise.all([
      this.page.waitForResponse(
        (resp) =>
          resp.status() === expectedStatus &&
          resp.statusText() === expectedStatusText
      ),
      this.page
        .locator(`#${linkName.toLowerCase().replace(/\s+/g, "-")}`)
        .click(),
    ]);

    expect(response.status()).toBe(expectedStatus);
    await expect(this.apiResponseText).toContainText(
      `Link has responded with staus ${expectedStatus} and status text ${expectedStatusText}`
    );
  }
}

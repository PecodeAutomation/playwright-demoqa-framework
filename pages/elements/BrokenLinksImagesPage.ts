import { expect, Locator, Page } from "@playwright/test";

export class BrokenLinksImagesPage {
  private readonly page: Page;
  private readonly validImage: Locator;
  private readonly brokenImage: Locator;
  private readonly validLink: Locator;
  private readonly brokenLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.validImage = page.locator('img[src="/images/Toolsqa.jpg"]').last();
    this.brokenImage = page.locator('img[src="/images/Toolsqa_1.jpg"]');
    this.validLink = page.locator('a[href="http://demoqa.com"]');
    this.brokenLink = page.locator(
      'a[href="http://the-internet.herokuapp.com/status_codes/500"]'
    );
  }

  async verifyImages() {
    await expect(this.validImage).toBeVisible();
    const validImageNaturalWidth = await this.validImage.evaluate(
      (img: HTMLImageElement) => img.naturalWidth
    );
    expect(validImageNaturalWidth).toBeGreaterThan(0);

    await expect(this.brokenImage).toBeVisible();
    const brokenImageNaturalWidth = await this.brokenImage.evaluate(
      (img: HTMLImageElement) => img.naturalWidth
    );
    expect(brokenImageNaturalWidth).toBe(0);
  }

  async verifyLinks() {
    await expect(this.validLink).toBeVisible();
    const [validLinkResponse] = await Promise.all([
      this.page.waitForResponse(
        (res) => res.url().includes("demoqa.com") && res.status() === 200
      ),
      this.validLink.click(),
    ]);
    expect(validLinkResponse.ok()).toBeTruthy();
    await this.page.goBack();

    await expect(this.brokenLink).toBeVisible();
    const [brokenLinkResponse] = await Promise.all([
      this.page.waitForResponse((res) => res.status() === 500),
      this.brokenLink.click(),
    ]);
    expect(brokenLinkResponse.status()).toBe(500);
  }

  async verifyAllElements() {
    await this.verifyImages();
    await this.verifyLinks();
  }
}

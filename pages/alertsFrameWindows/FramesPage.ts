import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class FramesPage extends BasePage {
  private readonly frame1: FrameLocator;
  private readonly frame2: FrameLocator;
  private readonly framesHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.frame1 = page.frameLocator("#frame1");
    this.frame2 = page.frameLocator("#frame2");
    this.framesHeading = page.locator("#framesWrapper div").first();
  }

  async verifyFrame1Content() {
    const frameHeading = this.frame1.getByRole("heading", { name: "This is a sample page" });
    await expect(frameHeading).toBeVisible();
    return await frameHeading.textContent();
  }

  async verifyFrame2Content() {
    const frameHeading = this.frame2.getByRole("heading", { name: "This is a sample page" });
    await expect(frameHeading).toBeVisible();
    return await frameHeading.textContent();
  }

  async verifyMainPageContent() {
    await expect(this.framesHeading).toBeVisible();
    return await this.framesHeading.textContent();
  }
}
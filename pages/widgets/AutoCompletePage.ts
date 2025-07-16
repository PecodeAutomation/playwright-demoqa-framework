import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AutoCompletePage extends BasePage {
  private readonly multipleInput: Locator;
  private readonly singleInput: Locator;
  private readonly multipleContainer: Locator;
  private readonly singleContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.multipleInput = page.locator("#autoCompleteMultipleInput");
    this.singleInput = page.locator("#autoCompleteSingleInput");
    this.multipleContainer = page.locator(".auto-complete__multi-value");
    this.singleContainer = page.locator(".auto-complete__single-value");
  }

  async typeMultipleColors(colors: string[]) {
    for (const color of colors) {
      await this.multipleInput.fill(color);
      await this.page.keyboard.press("Enter");
    }
  }

  async typeSingleColor(color: string) {
    await this.singleInput.fill(color);
    await this.page.keyboard.press("Enter");
  }

  async verifyMultipleColors(expectedColors: string[]) {
    const count = await this.multipleContainer.count();
    await expect(count).toBe(expectedColors.length);

    for (let i = 0; i < expectedColors.length; i++) {
      const colorText = await this.multipleContainer.nth(i).textContent();
      expect(colorText).toContain(expectedColors[i]);
    }
  }

  async verifySingleColor(expectedColor: string) {
    const colorText = await this.singleContainer.textContent();
    expect(colorText).toContain(expectedColor);
  }

  async removeMultipleColor(index: number) {
    const removeButton = this.multipleContainer.nth(index).locator(".auto-complete__multi-value__remove");
    await removeButton.click();
  }

  async clearMultipleInput() {
    const clearButton = this.page.locator(".auto-complete__clear-indicator");
    await clearButton.click();
  }
}
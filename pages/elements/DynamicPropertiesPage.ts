import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class DynamicPropertiesPage extends BasePage {
  private readonly enableAfterBtn: Locator;
  private readonly colorChangeBtn: Locator;
  private readonly visibleAfterBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.enableAfterBtn = page.locator("#enableAfter");
    this.colorChangeBtn = page.locator("#colorChange");
    this.visibleAfterBtn = page.locator("#visibleAfter");
  }

  async verifyButtonBecomesEnabled() {
    await this.assertButtonIsDisabled(this.enableAfterBtn);
    await this.enableAfterBtn.waitFor({ state: "attached", timeout: 7000 });
    await this.assertButtonIsEnabled(this.enableAfterBtn);
    return this.enableAfterBtn;
  }

  async verifyButtonColorChange() {
    const initialColor = await this.getButtonColor(this.colorChangeBtn);

    await this.waitForColorChange(this.colorChangeBtn, initialColor);

    const finalColor = await this.getButtonColor(this.colorChangeBtn);
    await this.assertColorChanged(initialColor, finalColor);

    return { initialColor, finalColor };
  }

  async verifyButtonAppears() {
    await this.assertButtonIsHidden(this.visibleAfterBtn);
    await this.visibleAfterBtn.waitFor({ state: "visible", timeout: 6000 });
    await this.assertButtonIsVisible(this.visibleAfterBtn);
    return this.visibleAfterBtn;
  }

  async verifyAllDynamicProperties() {
    const enabledButton = await this.verifyButtonBecomesEnabled();
    const colorChange = await this.verifyButtonColorChange();
    const visibleButton = await this.verifyButtonAppears();

    return {
      enabledButton,
      colorChange,
      visibleButton,
    };
  }

  private async assertButtonIsEnabled(button: Locator) {
    await expect(button).toBeEnabled();
  }

  private async assertButtonIsDisabled(button: Locator) {
    await expect(button).toBeDisabled();
  }

  private async assertButtonIsVisible(button: Locator) {
    await expect(button).toBeVisible();
  }

  private async assertButtonIsHidden(button: Locator) {
    await expect(button).toBeHidden();
  }

  private async assertColorChanged(initialColor: string, finalColor: string) {
    expect(initialColor).not.toBe(finalColor);
  }

  private async getButtonColor(button: Locator): Promise<string> {
    return await button.evaluate((el: Element) => {
      return window.getComputedStyle(el).color;
    });
  }

  private async waitForColorChange(button: Locator, initialColor: string) {
    await this.page.waitForFunction(
      ([btn, initialColor]) => {
        const element = btn as Element;
        const currentColor = window.getComputedStyle(element).color;
        return currentColor !== initialColor;
      },
      [await button.elementHandle(), initialColor] as const,
      { timeout: 6000 }
    );
  }
}

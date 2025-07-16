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
    await expect(this.enableAfterBtn).toBeDisabled();
    await this.enableAfterBtn.waitFor({ state: "attached", timeout: 7000 });
    await expect(this.enableAfterBtn).toBeEnabled();
    return this.enableAfterBtn;
  }

  async verifyButtonColorChange() {
    const initialColor = await this.colorChangeBtn.evaluate((el: Element) => {
      return window.getComputedStyle(el).color;
    });

    await this.page.waitForFunction(
      ([btn, initialColor]) => {
        const element = btn as Element;
        const currentColor = window.getComputedStyle(element).color;
        return currentColor !== initialColor;
      },
      [await this.colorChangeBtn.elementHandle(), initialColor] as const,
      { timeout: 6000 }
    );

    const finalColor = await this.colorChangeBtn.evaluate((el: Element) => {
      return window.getComputedStyle(el).color;
    });

    return { initialColor, finalColor };
  }

  async verifyButtonAppears() {
    await expect(this.visibleAfterBtn).toBeHidden();
    await this.visibleAfterBtn.waitFor({ state: "visible", timeout: 6000 });
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
}

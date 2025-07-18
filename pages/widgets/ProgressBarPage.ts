import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ProgressBarPage extends BasePage {
  private readonly progressBar: Locator;
  private readonly startStopButton: Locator;
  private readonly resetButton: Locator;

  constructor(page: Page) {
    super(page);
    this.progressBar = page.locator(".progress-bar");
    this.startStopButton = page.locator("#startStopButton");
    this.resetButton = page.locator("#resetButton");
  }

  async startProgress() {
    await this.startStopButton.click();
  }

  async stopProgress() {
    await this.startStopButton.click();
  }

  async resetProgress() {
    await this.resetButton.click();
  }

  async getProgressValue(): Promise<number> {
    const ariaValueNow = await this.progressBar.getAttribute("aria-valuenow");
    return ariaValueNow ? parseInt(ariaValueNow) : 0;
  }

  async waitForProgress(desiredValue: number, timeout = 15000) {
    await this.page.waitForFunction(
      ({ bar, value }) => {
        const currentValue = parseInt(bar.getAttribute("aria-valuenow") || "0");
        return currentValue >= value;
      },
      { bar: await this.progressBar.elementHandle(), value: desiredValue },
      { timeout }
    );
  }

  async verifyProgressComplete() {
    await expect(this.progressBar).toHaveAttribute("aria-valuenow", "100");
    await expect(this.progressBar).toHaveClass(/success/);
  }

  async verifyProgressReset() {
    await expect(this.progressBar).toHaveAttribute("aria-valuenow", "0");
  }

  async verifyProgressAt(value: number) {
    const currentValue = await this.getProgressValue();
    expect(currentValue).toBe(value);
  }

  async verifyProgressBetween(min: number, max: number) {
    const currentValue = await this.getProgressValue();
    expect(currentValue).toBeGreaterThanOrEqual(min);
    expect(currentValue).toBeLessThanOrEqual(max);
  }
}

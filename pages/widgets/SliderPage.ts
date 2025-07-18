import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class SliderPage extends BasePage {
  private readonly slider: Locator;
  private readonly sliderValue: Locator;

  constructor(page: Page) {
    super(page);
    this.slider = page.locator(".range-slider");
    this.sliderValue = page.locator("#sliderValue");
  }

  async getCurrentValue(): Promise<number> {
    const value = await this.sliderValue.getAttribute('value');
    return Number(value);
  }

  async setValue(targetValue: number) {
    const currentValue = await this.getCurrentValue();
    const steps = targetValue - currentValue;

    for (let i = 0; i < Math.abs(steps); i++) {
      await this.slider.press(steps > 0 ? 'ArrowRight' : 'ArrowLeft');
    }
  }

  async dragSliderToValue(targetValue: number) {
    const sliderBoundingBox = await this.slider.boundingBox();
    if (!sliderBoundingBox) throw new Error('Slider not found');

    await this.slider.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(
      sliderBoundingBox.x + (sliderBoundingBox.width * (targetValue / 100)),
      sliderBoundingBox.y + sliderBoundingBox.height / 2
    );
    await this.page.mouse.up();
  }

  async verifyExactValue(expectedValue: number) {
    const actualValue = await this.getCurrentValue();
    expect(actualValue).toBe(expectedValue);
  }

  async verifyValueWithinRange(targetValue: number, tolerance = 1) {
    const actualValue = await this.getCurrentValue();
    expect(actualValue).toBeGreaterThanOrEqual(targetValue - tolerance);
    expect(actualValue).toBeLessThanOrEqual(targetValue + tolerance);
  }

  async verifyValueChangedFrom(initialValue: number) {
    const newValue = await this.getCurrentValue();
    expect(newValue).not.toBe(initialValue);
  }

  async verifyMinValue() {
    await this.verifyExactValue(0);
  }

  async verifyMaxValue() {
    await this.verifyExactValue(100);
  }
}

import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class SelectMenuPage extends BasePage {
  private readonly selectDropdown: Locator;
  private readonly multiSelectDropdown: Locator;
  private readonly selectOneContainer: Locator;
  private readonly selectOneInput: Locator;

  constructor(page: Page) {
    super(page);
    this.selectDropdown = page.locator("#oldSelectMenu");
    this.multiSelectDropdown = page.locator("#cars");
    this.selectOneContainer = page.locator("#selectOne");
    this.selectOneInput = page.locator("input#react-select-3-input");
  }

  async selectStandardOption(value: string) {
    await this.selectDropdown.selectOption(value);
  }

  async getSelectedStandardValue(): Promise<string> {
    return await this.selectDropdown.inputValue();
  }

  async selectMultipleOptions(values: string[]) {
    await this.multiSelectDropdown.selectOption(values);
  }

  async getSelectedMultiValues(): Promise<string[]> {
    return await this.multiSelectDropdown.evaluate(
      (select: HTMLSelectElement) =>
        Array.from(select.selectedOptions).map((option) => option.value)
    );
  }

  async openCustomSelect() {
    await this.selectOneContainer.click();
    await this.page.waitForTimeout(1000);
  }

  async searchAndSelectOption(searchText: string, optionText: string) {
    await this.selectOneInput.fill(searchText);
    await this.page.waitForTimeout(500);

    const optionSelector = `[id^="react-select-3-option"]:has-text("${optionText}")`;
    const option = this.page.locator(optionSelector);

    await option.waitFor({ state: "visible" });
    await option.click();

    await this.page.waitForTimeout(500);
  }

  async verifyStandardSelection(expectedValue: string) {
    const selected = await this.getSelectedStandardValue();
    expect(selected).toBe(expectedValue);
  }

  async verifyMultiSelection(expectedValues: string[]) {
    const selected = await this.getSelectedMultiValues();
    expect(selected).toEqual(expect.arrayContaining(expectedValues));
  }

  async verifyCustomSelection(expectedText: string) {
    const selectedValue = this.selectOneContainer.locator('[class*="singleValue"]');
    await expect(selectedValue).toHaveText(expectedText);
  }
}

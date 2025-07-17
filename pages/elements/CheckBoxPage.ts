import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class CheckBoxPage extends BasePage {
  private readonly expandToggle: Locator;
  private readonly collapseToggle: Locator;
  private readonly resultDiv: Locator;

  constructor(page: Page) {
    super(page);
    this.expandToggle = page.locator(".rct-icon-expand-close");
    this.collapseToggle = page.locator(".rct-icon-expand-open");
    this.resultDiv = page.locator("#result");
  }

  private getCheckboxLocator(label: string): Locator {
    return this.page.locator(
      `[for="tree-node-${label.toLowerCase()}"] span.rct-checkbox`
    );
  }

  private getCheckboxIcon(label: string): Locator {
    return this.getCheckboxLocator(label).locator("svg");
  }

  async expandAll() {
    await this.expandToggle.click();
  }

  async checkItem(itemName: string) {
    const item = this.page.locator(
      `.rct-collapse-btn ~ label:has(.rct-title:text-is("${itemName}"))`
    );
    await item.click();
  }

  async expandItem(value: string) {
    const item = this.page
      .locator(`[for="tree-node-${value}"]`)
      .locator("xpath=preceding-sibling::button");
    await item.click();
  }

  async collapseAll() {
    await this.collapseToggle.click();
  }

  async toggleCheckbox(label: string, state: boolean) {
    const checkbox = this.getCheckboxLocator(label);
    const currentState = await this.isChecked(label);

    if (currentState !== state) {
      await checkbox.hover();
      await checkbox.click();
    }
  }

  async isChecked(label: string): Promise<boolean> {
    const icon = this.getCheckboxIcon(label);
    const classAttribute = await icon.getAttribute("class");
    return classAttribute?.includes("rct-icon-check") ?? false;
  }

  async isExpanded(label: string): Promise<boolean> {
    const parentItem = this.page.locator(
      `li:has([for="tree-node-${label.toLowerCase()}"])`
    );
    const expandIcon = parentItem.locator(".rct-icon-expand-open");
    return await expandIcon.isVisible();
  }

  async verifySelectedItems(expectedItems: string[]) {
    const resultText = await this.resultDiv.textContent();

    for (const item of expectedItems) {
      expect(resultText).toContain(item.toLowerCase());
    }
  }

  async verifyCheckboxState(label: string, expectedState: boolean) {
    const actualState = await this.isChecked(label);
    expect(actualState).toBe(expectedState);
  }

  async verifyCheckboxToggled(label: string, initialState: boolean) {
    await this.verifyCheckboxState(label, initialState);
    await this.toggleCheckbox(label, !initialState);
    await this.verifyCheckboxState(label, !initialState);
    await this.toggleCheckbox(label, initialState);
    await this.verifyCheckboxState(label, initialState);
  }

  async getSelectedItems(): Promise<string[]> {
    const resultText = (await this.resultDiv.textContent()) || "";
    const matches = resultText.match(/[a-z]+\n/gi) || [];
    return matches.map((item) => item.trim());
  }

  async checkItems(items: string[]) {
    for (const item of items) {
      await this.toggleCheckbox(item, true);
    }
  }

  async uncheckItems(items: string[]) {
    for (const item of items) {
      await this.toggleCheckbox(item, false);
    }
  }
}

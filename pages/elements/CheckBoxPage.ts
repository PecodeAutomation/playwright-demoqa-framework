import { expect, Locator, Page } from "@playwright/test";

export class CheckBoxPage {
  private readonly page: Page;
  private readonly expandToggle: Locator;
  private readonly collapseToggle: Locator;
  private readonly resultDiv: Locator;

  constructor(page: Page) {
    this.page = page;
    this.expandToggle = page.locator('.rct-icon-expand-close');
    this.collapseToggle = page.locator('.rct-icon-expand-open');
    this.resultDiv = page.locator('#result');
  }

  private getCheckboxLocator(label: string): Locator {
    return this.page.locator(`[for="tree-node-${label.toLowerCase()}"] span.rct-checkbox`);
  }

  private getCheckboxIcon(label: string): Locator {
    return this.getCheckboxLocator(label).locator('svg');
  }

  async expandAll() {
    await this.expandToggle.click();
  }

  async collapseAll() {
    await this.collapseToggle.click();
  }

  async toggleCheckbox(label: string, state: boolean) {
    const checkbox = this.getCheckboxLocator(label);
    const currentState = await this.isChecked(label);
    
    if (currentState !== state) {
      await checkbox.click();
    }
  }

  async isChecked(label: string): Promise<boolean> {
    const icon = this.getCheckboxIcon(label);
    const classAttribute = await icon.getAttribute('class');
    return classAttribute?.includes('rct-icon-check') ?? false;
  }

  async isExpanded(label: string): Promise<boolean> {
    const parentItem = this.page.locator(`li:has([for="tree-node-${label.toLowerCase()}"])`);
    const expandIcon = parentItem.locator('.rct-icon-expand-open');
    return await expandIcon.isVisible();
  }

  async verifySelectedItems(expectedItems: string[]) {
    const resultText = await this.resultDiv.textContent();
    
    for (const item of expectedItems) {
      await expect(resultText).toContain(item.toLowerCase());
    }
    
    const selectedCount = (resultText?.match(/you have selected/g) || []).length;
    await expect(selectedCount).toBe(expectedItems.length);
  }

  async getSelectedItems(): Promise<string[]> {
    const resultText = await this.resultDiv.textContent() || '';
    const matches = resultText.match(/[a-z]+\n/gi) || [];
    return matches.map(item => item.trim());
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

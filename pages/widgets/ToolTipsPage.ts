import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class ToolTipsPage extends BasePage {
  private readonly hoverMeButton: Locator;
  private readonly inputField: Locator;
  private readonly contraryLink: Locator;
  private readonly toolTip: Locator;

  constructor(page: Page) {
    super(page)
    this.hoverMeButton = page.locator('#toolTipButton');
    this.inputField = page.locator('#toolTipTextField');
    this.contraryLink = page.locator('a:has-text("Contrary")');
    this.toolTip = page.locator('.tooltip-inner');
  }

  async hoverOverButton() {
    await this.hoverMeButton.hover();
    await this.page.waitForSelector('.tooltip.show');
  }

  async hoverOverInput() {
    await this.inputField.hover();
    await this.page.waitForSelector('.tooltip.show');
  }

  async hoverOverLink() {
    await this.contraryLink.hover();
    await this.page.waitForSelector('.tooltip.show');
  }

  async getTooltipText(): Promise<string> {
    return (await this.toolTip.textContent())?.trim() || '';
  }

  async verifyButtonTooltipVisible() {
    await this.hoverOverButton();
    await expect(this.toolTip).toBeVisible();
  }

  async verifyInputTooltipVisible() {
    await this.hoverOverInput();
    await expect(this.toolTip).toBeVisible();
  }

  async verifyLinkTooltipVisible() {
    await this.hoverOverLink();
    await expect(this.toolTip).toBeVisible();
  }

  async verifyButtonTooltipText() {
    await this.hoverOverButton();
    const text = await this.getTooltipText();
    expect(text).toBe('You hovered over the Button');
  }

  async verifyInputTooltipText() {
    await this.hoverOverInput();
    const text = await this.getTooltipText();
    expect(text).toBe('You hovered over the text field');
  }

  async verifyLinkTooltipText() {
    await this.hoverOverLink();
    const text = await this.getTooltipText();
    expect(text).toContain('Contrary');
  }

  async verifyTooltipIsVisible() {
    await expect(this.toolTip).toBeVisible();
  }

  async verifyTooltipIsHidden() {
    await expect(this.toolTip).not.toBeVisible();
  }

  async verifyTooltipDisappearsAfterMove() {
    await this.page.mouse.move(10, 10);
    await this.verifyTooltipIsHidden();
  }
}
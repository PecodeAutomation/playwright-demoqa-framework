import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ButtonsPage extends BasePage{
  private readonly doubleClickButton: Locator;
  private readonly rightClickButton: Locator;
  private readonly clickMeButton: Locator;
  private readonly doubleClickMessage: Locator;
  private readonly rightClickMessage: Locator;
  private readonly dynamicClickMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.doubleClickButton = page.locator("#doubleClickBtn");
    this.rightClickButton = page.locator("#rightClickBtn");
    this.clickMeButton = page.getByRole('button', { name: 'Click Me', exact: true });
    this.doubleClickMessage = page.locator("#doubleClickMessage");
    this.rightClickMessage = page.locator("#rightClickMessage");
    this.dynamicClickMessage = page.locator("#dynamicClickMessage");
  }

  async doubleClickButtonAction() {
    await this.doubleClickButton.dblclick();
  }

  async rightClickButtonAction() {
    await this.rightClickButton.click({ button: "right" });
  }

  async simpleClickButtonAction() {
    await this.clickMeButton.click();
  }

  async verifyDoubleClick() {
    await expect(this.doubleClickMessage).toBeVisible();
    await expect(this.doubleClickMessage).toHaveText(
      "You have done a double click"
    );
  }

  async verifyRightClick() {
    await expect(this.rightClickMessage).toBeVisible();
    await expect(this.rightClickMessage).toHaveText(
      "You have done a right click"
    );
  }

  async verifyDynamicClick() {
    await expect(this.dynamicClickMessage).toBeVisible();
    await expect(this.dynamicClickMessage).toHaveText(
      "You have done a dynamic click"
    );
  }

  async verifyAllButtonsActions() {
    await this.verifyDoubleClick();
    await this.verifyRightClick();
    await this.verifyDynamicClick();
  }
}

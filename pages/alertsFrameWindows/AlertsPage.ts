import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AlertsPage extends BasePage {
  private readonly simpleAlertButton: Locator;
  private readonly timerAlertButton: Locator;
  private readonly confirmAlertButton: Locator;
  private readonly promptAlertButton: Locator;
  private readonly confirmResult: Locator;
  private readonly promptResult: Locator;

  constructor(page: Page) {
    super(page);
    this.simpleAlertButton = page.locator("#alertButton");
    this.timerAlertButton = page.locator("#timerAlertButton");
    this.confirmAlertButton = page.locator("#confirmButton");
    this.promptAlertButton = page.locator("#promtButton");
    this.confirmResult = page.locator("#confirmResult");
    this.promptResult = page.locator("#promptResult");
  }

  async triggerSimpleAlert() {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toBe("You clicked a button");
      await dialog.accept();
    });
    await this.simpleAlertButton.click();
  }

  async triggerTimerAlert() {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toBe("This alert appeared after 5 seconds");
      await dialog.accept();
    });
    await this.timerAlertButton.click();
  }

  async triggerConfirmAlert(accept: boolean) {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("Do you confirm action?");
      accept ? await dialog.accept() : await dialog.dismiss();
    });
    await this.confirmAlertButton.click();
  }

  async triggerPromptAlert(text: string | null) {
    this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("Please enter your name");
      text ? await dialog.accept(text) : await dialog.dismiss();
    });
    await this.promptAlertButton.click();
  }

  async verifyConfirmResult(expectedText: string) {
    await expect(this.confirmResult).toHaveText(expectedText);
  }

  async verifyPromptResult(expectedText: string) {
    await expect(this.promptResult).toContainText(expectedText);
  }
}
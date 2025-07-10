import { expect, Locator, Page } from "@playwright/test";

export class RadioButtonPage {
  private readonly page: Page;
  private readonly yesRadio: Locator;
  private readonly impressiveRadio: Locator;
  private readonly noRadio: Locator;
  private readonly resultText: Locator;
  private readonly questionText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yesRadio = page.locator("#yesRadio ~ label");
    this.impressiveRadio = page.locator("#impressiveRadio ~ label");
    this.noRadio = page.locator("#noRadio ~ label");
    this.resultText = page.locator("p:has(> .text-success)");
    this.questionText = page.locator(".mb-3");
  }

  async selectYes() {
    await this.yesRadio.check();
  }

  async selectImpressive() {
    await this.impressiveRadio.check();
  }

  async trySelectNo() {
    await this.noRadio.click({ force: true });
  }

  async isYesSelected(): Promise<boolean> {
    return await this.yesRadio.isChecked();
  }

  async isImpressiveSelected(): Promise<boolean> {
    return await this.impressiveRadio.isChecked();
  }

  async isNoSelected(): Promise<boolean> {
    return await this.noRadio.isChecked();
  }

  async isNoDisabled(): Promise<boolean> {
    return await this.noRadio.isDisabled();
  }

  async verifyResultText(expectedText: string) {
    await expect(this.resultText).toHaveText(
      `You have selected ${expectedText}`
    );
  }

  async verifyQuestionText() {
    await expect(this.questionText).toHaveText("Do you like the site?");
  }

  async verifyHiddenResultText() {
    await expect(this.resultText).toBeHidden();
  }

  async selectAndVerify(option: "Yes" | "Impressive" | "No") {
    switch (option) {
      case "Yes":
        await this.selectYes();
        await this.verifyResultText("Yes");
        break;
      case "Impressive":
        await this.selectImpressive();
        await this.verifyResultText("Impressive");
        break;
      case "No":
        await this.trySelectNo();
        await this.verifyHiddenResultText();
        break;
    }
  }
}

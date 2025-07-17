import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class RadioButtonPage extends BasePage {
  private readonly yesRadio: Locator;
  private readonly impressiveRadio: Locator;
  private readonly noRadio: Locator;
  private readonly resultText: Locator;
  private readonly questionText: Locator;

  constructor(page: Page) {
    super(page);
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

  private async isYesSelected(): Promise<boolean> {
    return await this.yesRadio.isChecked();
  }

  private async isImpressiveSelected(): Promise<boolean> {
    return await this.impressiveRadio.isChecked();
  }

  private async isNoSelected(): Promise<boolean> {
    return await this.noRadio.isChecked();
  }

  private async isNoDisabled(): Promise<boolean> {
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

  async assertYesSelected(shouldBeSelected: boolean = true) {
    expect(await this.isYesSelected()).toBe(shouldBeSelected);
  }

  async assertImpressiveSelected(shouldBeSelected: boolean = true) {
    expect(await this.isImpressiveSelected()).toBe(shouldBeSelected);
  }

  async assertNoSelected(shouldBeSelected: boolean = true) {
    expect(await this.isNoSelected()).toBe(shouldBeSelected);
  }

  async assertNoDisabled(shouldBeDisabled: boolean = true) {
    expect(await this.isNoDisabled()).toBe(shouldBeDisabled);
  }

  async assertInitialState() {
    await this.assertYesSelected(false);
    await this.assertImpressiveSelected(false);
    await this.assertNoSelected(false);
    await this.assertNoDisabled(true);
    await this.verifyHiddenResultText();
  }

  async selectAndVerify(option: "Yes" | "Impressive" | "No") {
    switch (option) {
      case "Yes":
        await this.selectYes();
        await this.assertYesSelected();
        await this.verifyResultText("Yes");
        break;
      case "Impressive":
        await this.selectImpressive();
        await this.assertImpressiveSelected();
        await this.verifyResultText("Impressive");
        break;
      case "No":
        await this.trySelectNo();
        await this.assertNoSelected(false);
        await this.verifyHiddenResultText();
        break;
    }
  }
}

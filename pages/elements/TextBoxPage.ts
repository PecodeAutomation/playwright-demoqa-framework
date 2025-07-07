import { expect, Locator, Page } from "@playwright/test";
import { FormComponent } from "../../components/common/FormComponent";

export interface TextBoxFormData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export class TextBoxPage {
  private readonly page: Page;
  private nameValue: Locator;
  private emailValue: Locator;
  private currentAddressValue: Locator;
  private permanentAddressValue: Locator;
  public formComponent: FormComponent;

  constructor(page: Page) {
    this.page = page;
    this.nameValue = page.locator("#name");
    this.emailValue = page.locator("#email");
    this.currentAddressValue = page.locator("#currentAddress");
    this.permanentAddressValue = page.locator("#permanentAddress");
    this.formComponent = new FormComponent(page);
  }

  async verifyData(
    data: TextBoxFormData
  ) {
    await expect(this.nameValue).toContainText(data.fullName);
    await expect(this.emailValue).toContainText(data.email);
    await expect(this.currentAddressValue).toContainText(data.currentAddress);
    await expect(this.permanentAddressValue).toContainText(data.permanentAddress);
  }
}

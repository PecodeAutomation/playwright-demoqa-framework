import { expect, Locator, Page } from "@playwright/test";
import { FormComponent } from "../../components/common/FormComponent";
import { BasePage } from "../BasePage";

export interface TextBoxFormData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export class TextBoxPage extends BasePage {
  private nameValue: Locator;
  private emailValue: Locator;
  private currentAddressValue: Locator;
  private permanentAddressValue: Locator;
  public formComponent: FormComponent;

  constructor(page: Page) {
    super(page);
    this.nameValue = page.locator("#name");
    this.emailValue = page.locator("#email");
    this.currentAddressValue = page.locator("#currentAddress").last();
    this.permanentAddressValue = page.locator("#permanentAddress").last();
    this.formComponent = new FormComponent(page);
  }

  async verifyData(data: TextBoxFormData) {
    await expect(this.nameValue).toContainText(data.fullName);
    await expect(this.emailValue).toContainText(data.email);
    await expect(this.currentAddressValue).toContainText(data.currentAddress);
    await expect(this.permanentAddressValue).toContainText(
      data.permanentAddress
    );
  }
}

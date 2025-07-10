import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../pages/BasePage";

export class FormComponent extends BasePage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private userNameInput: Locator;
  private passwordInput: Locator;
  private ageInput: Locator;
  private salaryInput: Locator;
  private departmentInput: Locator;
  private registerButton: Locator;
  private fullNameInput: Locator;
  private emailInput: Locator;
  private currentAddressField: Locator;
  private permanentAddressField: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.userNameInput = page.locator("#userName");
    this.passwordInput = page.locator("#password");
    this.registerButton = page.locator("#register");
    this.ageInput = page.locator("#age");
    this.salaryInput = page.locator("#salary");
    this.departmentInput = page.locator("#department");
    this.fullNameInput = page.getByPlaceholder("Full Name");
    this.emailInput = page.getByPlaceholder("name@example.com");
    this.currentAddressField = page.getByPlaceholder("Current Address");
    this.permanentAddressField = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");
  }

  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    userName: string,
    password: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async fillFirstName(value: string) {
    await this.firstNameInput.fill(value);
  }

  async fillLastName(value: string) {
    await this.lastNameInput.fill(value);
  }

  async fillFullName(value: string) {
    await this.fullNameInput.fill(value);
  }

  async fillEmail(value: string) {
    await this.emailInput.fill(value);
  }

  async fillAge(value: string) {
    await this.ageInput.fill(value);
  }

  async fillSalary(value: string) {
    await this.salaryInput.fill(value);
  }

  async fillDepartment(value: string) {
    await this.departmentInput.fill(value);
  }

  async fillCurrentAddress(value: string) {
    await this.currentAddressField.fill(value);
  }

  async fillPermanentAddress(value: string) {
    await this.permanentAddressField.fill(value);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async verifyEmailError() {
    await expect(this.emailInput).toHaveJSProperty("validity.valid", false)
  }

  async expectEmailErrorVisible() {
    await expect(this.emailInput).toHaveClass(/field-error/);
    await expect(
      this.page.getByText("Please enter a valid email")
    ).toBeVisible();
  }

  async expectFieldsHighlighted() {
    await expect(this.fullNameInput).toHaveClass(/field-error/);
    await expect(this.emailInput).toHaveClass(/field-error/);
  }
}

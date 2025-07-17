import { Page, Locator, expect } from "@playwright/test";

export class FormComponent {
  private readonly page: Page;
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
  private mobileInput: Locator;
  private dateOfBirthInput: Locator;
  private subjectsInput: Locator;
  private pictureUpload: Locator;
  private stateDropdown: Locator;
  private cityDropdown: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
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
    this.mobileInput = page.locator("#userNumber");
    this.dateOfBirthInput = page.locator("#dateOfBirthInput");
    this.subjectsInput = page.locator("#subjectsInput");
    this.pictureUpload = page.locator("#uploadPicture");
    this.stateDropdown = page.locator("#state");
    this.cityDropdown = page.locator("#city");
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

  async selectGender(gender: string) {
    await this.page.getByText(gender, { exact: true }).click();
  }

  async fillMobileNumber(phone: string) {
    await this.mobileInput.fill(phone);
  }

  async setDateOfBirth(dateString: string) {
    await this.dateOfBirthInput.fill(dateString);
    await this.page.keyboard.press("Enter");
  }

  async selectSubjects(subjects: string[]) {
    for (const subject of subjects) {
      await this.subjectsInput.fill(subject);
      await this.page.keyboard.press("Enter");
    }
  }

  async selectHobbies(hobbies: string[]) {
    for (const hobby of hobbies) {
      await this.page.locator(`text=${hobby}`).click();
    }
  }

  async uploadPicture(filePath: string) {
    await this.pictureUpload.setInputFiles(filePath);
  }

  async selectState(state: string) {
    await this.stateDropdown.click();
    await this.page.getByText(state, { exact: true }).click();
  }

  async selectCity(city: string) {
    await this.cityDropdown.click();
    await this.page.getByText(city, { exact: true }).click();
  }

  async clickSubmit() {
    expect(this.submitButton).not.toBeDisabled();
    await this.submitButton.click();
  }

  async verifyEmailError() {
    await expect(this.emailInput).toHaveJSProperty("validity.valid", false);
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

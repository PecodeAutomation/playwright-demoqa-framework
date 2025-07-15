import { Locator, Page, expect } from "@playwright/test";
import { FormComponent } from "../../components/common/FormComponent";
import { BasePage } from "../BasePage";

export class PracticeFormPage extends BasePage {
  private readonly tableFirstAndLastName: Locator;
  private readonly tableEmail: Locator;
  private readonly tableGender: Locator;
  private readonly tableMobile: Locator;
  private readonly tableBirthDate: Locator;
  private readonly tableSubjects: Locator;
  private readonly tableHobbies: Locator;
  private readonly tablePicture: Locator;
  private readonly tableAddress: Locator;
  private readonly tableStateAndCity: Locator;
  public formComponent: FormComponent;

  constructor(page: Page) {
    super(page);
    this.tableFirstAndLastName = page.locator(
      `td:has-text('Student Name') + td`
    );
    this.tableEmail = page.locator(`td:has-text('Student Email') + td`);
    this.tableGender = page.locator(`td:has-text('Gender') + td`);
    this.tableMobile = page.locator(`td:has-text('Mobile') + td`);
    this.tableBirthDate = page.locator(`td:has-text('Date of Birth') + td`);
    this.tableSubjects = page.locator(`td:has-text('Subjects') + td`);
    this.tableHobbies = page.locator(`td:has-text('Hobbies') + td`);
    this.tablePicture = page.locator(`td:has-text('Picture') + td`);
    this.tableAddress = page.locator(`td:has-text('Address') + td`);
    this.tableStateAndCity = page.locator(`td:has-text('State and City') + td`);
    this.formComponent = new FormComponent(page);
  }

  async submitForm() {
    await this.formComponent.clickSubmit();
  }

  async verifyFirstLastName(firstName: string, lastName: string) {
    await expect(this.tableFirstAndLastName).toHaveText(
      `${firstName} ${lastName}`
    );
  }

  async verifyEmail(email: string) {
    await expect(this.tableEmail).toHaveText(`${email}`);
  }

  async verifyGender(gender: string) {
    await expect(this.tableGender).toHaveText(`${gender}`);
  }

  async verifyMobileNumber(number: string) {
    await expect(this.tableMobile).toHaveText(`${number}`);
  }

  async verifyBirthDate(birthDate: string) {
    await expect(this.tableBirthDate).toHaveText(`${birthDate}`);
  }

  async verifySubjects(subjects: string) {
    await expect(this.tableSubjects).toHaveText(`${subjects}`);
  }

  async verifyHobbies(hobbies: string) {
    await expect(this.tableHobbies).toHaveText(`${hobbies}`);
  }

  async verifyPicture(picture: string) {
    await expect(this.tablePicture).toHaveText(`${picture}`);
  }

  async verifyAddress(address: string) {
    await expect(this.tableAddress).toHaveText(`${address}`);
  }

  async verifyStateAndCity(state: string, city: string) {
    await expect(this.tableStateAndCity).toHaveText(`${state} ${city}`);
  }
}

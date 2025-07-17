import { Page, Locator, expect } from "@playwright/test";
import { FormComponent } from "../../components/common/FormComponent";
import { WebTablesFormUser } from "../../types/interfaces/user";
import { BasePage } from "../BasePage";

export interface PartialWebTablesFormData extends Partial<WebTablesFormUser> {}

export class WebTablesPage extends BasePage {
  private readonly addButton: Locator;
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;
  private readonly tableRows: Locator;
  public formComponent: FormComponent;

  constructor(page: Page) {
    super(page);
    this.addButton = page.locator("#addNewRecordButton");
    this.searchBox = page.locator("#searchBox");
    this.searchButton = page.locator("#basic-addon2");
    this.tableRows = page.locator(
      ".rt-tbody .rt-tr-group:not(.rt-tr-group-no-data)"
    );
    this.formComponent = new FormComponent(page);
  }

  async clickAddButton(): Promise<void> {
    await this.addButton.click();
  }

  async searchRecord(searchTerm: string): Promise<void> {
    await this.searchBox.fill(searchTerm);
    await this.searchButton.click();
  }

  async addNewRecord(data: WebTablesFormUser): Promise<void> {
    await this.clickAddButton();
    await this.fillForm(data);
    await this.formComponent.clickSubmit();
  }

  private async fillForm(data: WebTablesFormUser): Promise<void> {
    await this.formComponent.fillFirstName(data.firstName);
    await this.formComponent.fillLastName(data.lastName);
    await this.formComponent.fillEmail(data.email);
    await this.formComponent.fillAge(data.age);
    await this.formComponent.fillSalary(data.salary);
    await this.formComponent.fillDepartment(data.department);
  }

  async getRowCount(): Promise<number> {
    return this.tableRows.count();
  }

  async getRowData(rowIndex: number): Promise<WebTablesFormUser> {
    const row = this.tableRows.nth(rowIndex);
    const cells = row.locator('[role="gridcell"]:not(.action-buttons)');

    const getText = async (index: number): Promise<string> =>
      (await cells.nth(index).textContent())?.trim() ?? "";

    return {
      firstName: await getText(0),
      lastName: await getText(1),
      age: await getText(2),
      email: await getText(3),
      salary: await getText(4),
      department: await getText(5),
    };
  }

  async editRecord(
    rowIndex: number,
    newData: PartialWebTablesFormData
  ): Promise<void> {
    await this.tableRows
      .nth(rowIndex)
      .locator(`#edit-record-${rowIndex + 1}`)
      .click();
    await this.fillForm(newData as WebTablesFormUser);
    await this.formComponent.clickSubmit();
  }

  async deleteRecord(rowIndex: number): Promise<void> {
    await this.tableRows
      .nth(rowIndex)
      .locator(`#delete-record-${rowIndex + 1}`)
      .click();
  }

  async assertRowCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getRowCount();
    expect(actualCount).toBe(expectedCount);
  }

  async assertRowDataMatches(
    rowIndex: number,
    expectedData: PartialWebTablesFormData
  ): Promise<void> {
    const rowData = await this.getRowData(rowIndex);
    this.assertPartialDataMatch(rowData, expectedData);
  }

  private assertPartialDataMatch(
    actualData: WebTablesFormUser,
    expectedData: PartialWebTablesFormData
  ): void {
    Object.entries(expectedData).forEach(([key, value]) => {
      if (value !== undefined) {
        expect(actualData[key as keyof WebTablesFormUser]).toBe(value);
      }
    });
  }

  async assertRecordExists(
    expectedData: PartialWebTablesFormData
  ): Promise<void> {
    const count = await this.getRowCount();
    let found = false;

    for (let i = 0; i < count; i++) {
      const rowData = await this.getRowData(i);

      if (this.matchPartialData(rowData, expectedData)) {
        found = true;
        break;
      }
    }

    expect(found).toBe(true);
  }

  async assertSearchResultsContain(searchTerm: string): Promise<void> {
    const count = await this.getRowCount();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const rowData = await this.getRowData(i);
      expect(
        Object.values(rowData).some((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ).toBe(true);
    }
  }

  private matchPartialData(
    rowData: WebTablesFormUser,
    expectedData: PartialWebTablesFormData
  ): boolean {
    return Object.entries(expectedData).every(
      ([key, value]) =>
        value === undefined || rowData[key as keyof WebTablesFormUser] === value
    );
  }
}

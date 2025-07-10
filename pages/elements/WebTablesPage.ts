import { Page, Locator, expect } from "@playwright/test";
import { FormComponent } from "../../components/common/FormComponent";

export interface WebTablesFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  salary: string;
  department: string;
}

export interface PartialWebTablesFormData extends Partial<WebTablesFormData> {}

export class WebTablesPage {
  private readonly page: Page;
  private readonly addButton: Locator;
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;
  private readonly tableRows: Locator;
  public formComponent: FormComponent;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator("#addNewRecordButton");
    this.searchBox = page.locator("#searchBox");
    this.searchButton = page.locator("#basic-addon2");
    this.tableRows = page.locator(".rt-tbody .rt-tr-group:not(.rt-tr-group-no-data)");
    this.formComponent = new FormComponent(page);
  }

  async clickAddButton(): Promise<void> {
    await this.addButton.click();
  }

  async searchRecord(searchTerm: string): Promise<void> {
    await this.searchBox.fill(searchTerm);
    await this.searchButton.click();
  }

  async addNewRecord(data: WebTablesFormData): Promise<void> {
    await this.clickAddButton();
    await this.fillForm(data);
    await this.formComponent.clickSubmit();
  }

  private async fillForm(data: WebTablesFormData): Promise<void> {
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

  async getRowData(rowIndex: number): Promise<WebTablesFormData> {
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
      department: await getText(5)
    };
  }

  async editRecord(rowIndex: number, newData: PartialWebTablesFormData): Promise<void> {
    await this.tableRows.nth(rowIndex).locator(`#edit-record-${rowIndex + 1}`).click();
    await this.fillForm(newData as WebTablesFormData);
    await this.formComponent.clickSubmit();
  }

  async deleteRecord(rowIndex: number): Promise<void> {
    await this.tableRows.nth(rowIndex).locator(`#delete-record-${rowIndex + 1}`).click();
  }

  async verifyRecordExists(expectedData: PartialWebTablesFormData): Promise<void> {
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

  private matchPartialData(rowData: WebTablesFormData, expectedData: PartialWebTablesFormData): boolean {
    return Object.entries(expectedData).every(
      ([key, value]) => value === undefined || rowData[key as keyof WebTablesFormData] === value
    );
  }
}
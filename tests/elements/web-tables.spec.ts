import { test } from "../../fixtures/ElementsFixtures";
import { UserDataFactory } from "../../fixtures/UserDataFactory";
import { WebTablesFormUser } from "../../types/interfaces/user";

test.describe("Web Tables Functionality", () => {
  let testData: WebTablesFormUser;

  test.beforeEach(async ({}) => {
    const user = UserDataFactory.getRandomUser();
    testData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age?.toString() || "30",
      salary: "50000",
      department: "IT",
    };
  });

  test("Positive: Add new record to table", async ({ webTablesPage }) => {
    await webTablesPage.verifyBaseComponents();
    const initialCount = await webTablesPage.getRowCount();
    
    await webTablesPage.addNewRecord(testData);
    await webTablesPage.assertRowCount(initialCount);
    await webTablesPage.assertRecordExists(testData);
  });

  test("Positive: Edit existing record", async ({ webTablesPage }) => {
    await webTablesPage.verifyBaseComponents();
    await webTablesPage.addNewRecord(testData);

    const updatedData: WebTablesFormUser = {
      ...testData,
      salary: "60000",
      department: "Engineering",
    };

    await webTablesPage.editRecord(0, updatedData);
    await webTablesPage.assertRecordExists(updatedData);
  });

  test("Positive: Delete record from table", async ({ webTablesPage }) => {
    await webTablesPage.verifyBaseComponents();
    await webTablesPage.addNewRecord(testData);
    const countBeforeDelete = await webTablesPage.getRowCount();

    await webTablesPage.deleteRecord(0);
    await webTablesPage.assertRowCount(countBeforeDelete);
    await webTablesPage.searchRecord(testData.firstName);
  });

  test("Positive: Search for records", async ({ webTablesPage }) => {
    await webTablesPage.verifyBaseComponents();
    await webTablesPage.addNewRecord(testData);

    const uniqueName = `Search_${Date.now()}`;
    const searchableData: WebTablesFormUser = {
      ...testData,
      firstName: uniqueName,
    };
    
    await webTablesPage.addNewRecord(searchableData);
    await webTablesPage.searchRecord(uniqueName);
    await webTablesPage.assertRowDataMatches(0, { firstName: uniqueName });
  });

  test("Negative: Add record with invalid email", async ({ webTablesPage }) => {
    const invalidData: WebTablesFormUser = {
      ...testData,
      email: "invalid-email",
    };
    
    await webTablesPage.verifyBaseComponents();
    await webTablesPage.addNewRecord(invalidData);
    await webTablesPage.formComponent.verifyEmailError();
  });

  test.skip("Boundary: Maximum field lengths", async ({ webTablesPage }) => {
    const boundaryData: WebTablesFormUser = {
      firstName: "A".repeat(100),
      lastName: "B".repeat(100),
      email: `${"C".repeat(50)}@test.com`,
      age: "999",
      salary: "999999",
      department: "D".repeat(100),
    };
     
    await webTablesPage.verifyBaseComponents();
    await webTablesPage.addNewRecord(boundaryData);
    await webTablesPage.assertRecordExists(boundaryData);
  });
});

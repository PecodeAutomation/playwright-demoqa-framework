import { test } from "../../fixtures/ElementsFixtures";
import { UserDataFactory } from "../../fixtures/UserDataFactory";

test.describe("Elements - Textbox page", () => {
  test("Positive: Submit with positive data", async ({ textBoxPage }) => {
    const validUser = UserDataFactory.getRandomUser();
    const formData = {
      fullName: `${validUser.firstName} ${validUser.lastName}`,
      email: validUser.email,
      currentAddress: validUser.address!,
      permanentAddress: validUser.address!,
    };

    await textBoxPage.formComponent.fillFullName(formData.fullName);
    await textBoxPage.formComponent.fillEmail(formData.email);
    await textBoxPage.formComponent.fillCurrentAddress(formData.email);
    await textBoxPage.formComponent.fillPermanentAddress(formData.email);
    await textBoxPage.formComponent.clickSubmit();
    await textBoxPage.verifyData(formData);
  });

  test("Negative: Submit with invalid email", async ({ textBoxPage }) => {
    const invalidUser = UserDataFactory.getInvalidUser();
    
    await textBoxPage.formComponent.fillEmail(invalidUser.email);
    await textBoxPage.formComponent.clickSubmit();
    
    await textBoxPage.formComponent.expectEmailErrorVisible();
  });

  test("Negative: Submit empty form", async ({ textBoxPage }) => {
    await textBoxPage.formComponent.clickSubmit();
    await textBoxPage.formComponent.expectFieldsHighlighted();
  });

  test("Boundary: Maximum length for fields", async ({ textBoxPage }) => {
    const allowedLengthString = 'A'.repeat(1000);
    const formData = {
      fullName: allowedLengthString,
      email: allowedLengthString.slice(0, -9) + "@test.com",
      currentAddress: allowedLengthString,
      permanentAddress: allowedLengthString,
    };
    
    await textBoxPage.formComponent.fillFullName(formData.fullName);
    await textBoxPage.formComponent.fillEmail(formData.email);
    await textBoxPage.formComponent.fillCurrentAddress(formData.currentAddress);
    await textBoxPage.formComponent.fillPermanentAddress(formData.permanentAddress);
    await textBoxPage.formComponent.clickSubmit();
    await textBoxPage.verifyData(formData);
  });
});

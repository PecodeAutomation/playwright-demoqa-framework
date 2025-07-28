import { test } from "../../../fixtures/ElementsFixtures";
import { UserDataFactory } from "../../../fixtures/UserDataFactory";

test.describe("Textbox Functionality", () => {
  const testData = {
    validUser: UserDataFactory.getRandomUser()
 };

  test.beforeEach(async ({ textBoxPage }) => {
    await textBoxPage.verifyBaseComponents();
  });
  test.describe("Mobile Specific Tests", () => {
    test("Submit form on mobile device", async ({ textBoxPage, isMobile }) => {
      test.skip(!isMobile, "This is mobile-only test");

      const formData = {
        fullName: `${testData.validUser.firstName} ${testData.validUser.lastName}`,
        email: testData.validUser.email,
        currentAddress: testData.validUser.address!,
        permanentAddress: testData.validUser.address!
      };

      await textBoxPage.verifyMobileLayout();
      await textBoxPage.formComponent.fillForm(formData);
      await textBoxPage.submitFormOnMobile();
      await textBoxPage.verifyData(formData);
    });
  });
});
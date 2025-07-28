import { test } from "../../fixtures/WidgetsFixtures";
import { SelectMenu } from "../../types/widgets";

test.describe("Select Menu Functionality", () => {
  test("Should select standard option", async ({ selectMenuPage }) => {
    await selectMenuPage.verifyBaseComponents();
    await selectMenuPage.selectStandardOption(SelectMenu.STANDARD_BLUE);
    await selectMenuPage.verifyStandardSelection(SelectMenu.STANDARD_BLUE);
  });

  test("Should select multiple options", async ({ selectMenuPage }) => {
    await selectMenuPage.verifyBaseComponents();
    await selectMenuPage.selectMultipleOptions([
      SelectMenu.MULTI_VOLVO,
      SelectMenu.MULTI_AUDI,
    ]);
    await selectMenuPage.verifyMultiSelection([
      SelectMenu.MULTI_VOLVO,
      SelectMenu.MULTI_AUDI,
    ]);
  });

  test("Should search and select custom option", async ({ selectMenuPage }) => {
    await selectMenuPage.verifyBaseComponents();
    await selectMenuPage.openCustomSelect();
    await selectMenuPage.searchAndSelectOption("Prof", SelectMenu.CUSTOM_PROF);
    await selectMenuPage.verifyCustomSelection(SelectMenu.CUSTOM_PROF);
  });

  test("Should handle all select types", async ({ selectMenuPage }) => {
    await selectMenuPage.verifyBaseComponents();
    await selectMenuPage.selectStandardOption(SelectMenu.STANDARD_GREEN);
    await selectMenuPage.selectMultipleOptions([
      SelectMenu.MULTI_SAAB,
      SelectMenu.MULTI_OPEL,
    ]);
    await selectMenuPage.openCustomSelect();
    await selectMenuPage.searchAndSelectOption("Dr", SelectMenu.CUSTOM_DR);
    await selectMenuPage.verifyStandardSelection(SelectMenu.STANDARD_GREEN);
    await selectMenuPage.verifyMultiSelection([
      SelectMenu.MULTI_SAAB,
      SelectMenu.MULTI_OPEL,
    ]);
    await selectMenuPage.verifyCustomSelection(SelectMenu.CUSTOM_DR);
  });
});

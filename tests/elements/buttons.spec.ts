import { test } from "../../fixtures/ElementsFixtures";

test.describe("Buttons Functionality", () => {
  test.beforeEach(async ({ buttonsPage }) => {
    await buttonsPage.verifyBaseComponents();
  });
  test("Double Click Button", async ({ buttonsPage }) => {
    await buttonsPage.doubleClickButtonAction();
    await buttonsPage.verifyDoubleClick();
  });

  test("Right Click Button", async ({ buttonsPage }) => {
    await buttonsPage.rightClickButtonAction();
    await buttonsPage.verifyRightClick();
  });

  test("Simple Click Button", async ({ buttonsPage }) => {
    await buttonsPage.simpleClickButtonAction();
    await buttonsPage.verifyDynamicClick();
  });

  test("All buttons in one flow", async ({ buttonsPage }) => {
    await buttonsPage.doubleClickButtonAction();
    await buttonsPage.rightClickButtonAction();
    await buttonsPage.simpleClickButtonAction();
    await buttonsPage.verifyAllButtonsActions();
  });
});

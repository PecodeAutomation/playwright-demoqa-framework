import { test } from "../../fixtures/ElementsFixtures";

test.describe("Elements - Buttons page", () => {
  test("Double Click Button", async ({ buttonsPage }) => {
    await buttonsPage.verifyBaseComponents();
    await buttonsPage.doubleClickButtonAction();
    await buttonsPage.verifyDoubleClick();
  });

  test("Right Click Button", async ({ buttonsPage }) => {
    await buttonsPage.verifyBaseComponents();
    await buttonsPage.rightClickButtonAction();
    await buttonsPage.verifyRightClick();
  });

  test("Simple Click Button", async ({ buttonsPage }) => {
    await buttonsPage.verifyBaseComponents();
    await buttonsPage.simpleClickButtonAction();
    await buttonsPage.verifyDynamicClick();
  });

  test("All buttons in one flow", async ({ buttonsPage }) => {
    await buttonsPage.verifyBaseComponents();
    await buttonsPage.doubleClickButtonAction();
    await buttonsPage.rightClickButtonAction();
    await buttonsPage.simpleClickButtonAction();
    await buttonsPage.verifyAllButtonsActions();
  });
});

import { test } from "../../fixtures/AlertsFrameWindowsFixtures";

test.describe("Modal Dialogs Functionality", () => {
  test("Small modal workflow", async ({ modalDialogsPage }) => {
    await modalDialogsPage.verifyBaseComponents();
    await modalDialogsPage.verifySmallModal();
  });

  test("Large modal workflow", async ({ modalDialogsPage }) => {
    await modalDialogsPage.verifyBaseComponents();
    await modalDialogsPage.verifyLargeModal();
  });

  test("All modals workflow", async ({ modalDialogsPage }) => {
    await modalDialogsPage.verifyBaseComponents();
    await modalDialogsPage.verifyAllModalsWorkflow();
  });
});
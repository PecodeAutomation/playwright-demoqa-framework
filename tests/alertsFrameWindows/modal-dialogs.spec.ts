import { test } from "../../fixtures/AlertsFrameWindowsFixtures";

test.describe("Modal Dialogs Functionality", () => {
  test.beforeEach(async ({ modalDialogsPage }) => {
    await modalDialogsPage.verifyBaseComponents();
  });
  test("Small modal workflow", async ({ modalDialogsPage }) => {
    await modalDialogsPage.verifySmallModal();
  });

  test("Large modal workflow", async ({ modalDialogsPage }) => {
    await modalDialogsPage.verifyLargeModal();
  });

  test("All modals workflow", async ({ modalDialogsPage }) => {
    await modalDialogsPage.verifyAllModalsWorkflow();
  });
});
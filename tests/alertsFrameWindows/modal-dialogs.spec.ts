import { expect } from "@playwright/test";
import { test } from "../../fixtures/AlertsFrameWindowsFixtures";
import { ModalDialogContent } from "../../types/alerts-frame-windows";

test.describe("Alerts, Frame & Windows - Modal Dialogs page", () => {
  test("Open and verify small modal", async ({ modalDialogsPage }) => {
    const modal = await modalDialogsPage.openSmallModal();

    expect(modal.title).toBe(ModalDialogContent.SMALL_TITLE);
    expect(modal.body).toContain(ModalDialogContent.SMALL_BODY);

    await modalDialogsPage.closeModal();
  });

  test("Open and verify large modal", async ({ modalDialogsPage }) => {
    const modal = await modalDialogsPage.openLargeModal();

    expect(modal.title).toBe(ModalDialogContent.LARGE_TITLE);
    expect(modal.body).toContain(ModalDialogContent.LARGE_BODY);

    await modalDialogsPage.closeModal();
  });

  test("Verify both modals workflow", async ({ modalDialogsPage }) => {
    const smallModal = await modalDialogsPage.verifyModalContent("small");
    expect(smallModal.title).toBe(ModalDialogContent.SMALL_TITLE);

    const largeModal = await modalDialogsPage.verifyModalContent("large");
    expect(largeModal.title).toBe(ModalDialogContent.LARGE_TITLE);
  });
});

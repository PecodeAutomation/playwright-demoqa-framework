import { expect } from "@playwright/test";
import { test } from "../../fixtures/WidgetsFixtures";

test.describe("Progress Bar Functionality", () => {
  test.beforeEach(async ({ progressBarPage }) => {
    await progressBarPage.verifyBaseComponents();
  });
  test("Test complete progress from 0% to 100%", async ({
    progressBarPage,
  }) => {
    await progressBarPage.startProgress();
    await progressBarPage.waitForProgress(100);
    await progressBarPage.verifyProgressComplete();
  });

  test("Test stop and resume progress", async ({ progressBarPage }) => {
    await progressBarPage.startProgress();
    await progressBarPage.waitForProgress(30);
    await progressBarPage.stopProgress();
    const pausedValue = await progressBarPage.getProgressValue();

    await progressBarPage.startProgress();
    await progressBarPage.waitForProgress(100);
    await progressBarPage.verifyProgressComplete();
    await progressBarPage.verifyProgressBetween(pausedValue, 100);
  });

  test("Test reset progress", async ({ progressBarPage }) => {
    await progressBarPage.startProgress();
    await progressBarPage.waitForProgress(50);
    await progressBarPage.resetProgress();
    await progressBarPage.verifyProgressReset();
  });

  test("Test not exceed 100%", async ({ progressBarPage }) => {
    await progressBarPage.startProgress();
    await progressBarPage.waitForProgress(100);
    await progressBarPage.verifyProgressComplete();
    await expect(progressBarPage.getProgressValue()).resolves.toBe(100);
  });
});

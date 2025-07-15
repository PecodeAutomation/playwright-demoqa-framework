import { expect } from "@playwright/test";
import { test } from "../../fixtures/ElementsFixtures";

test.describe("Elements - Radio Button page", () => {
  test('Positive: Select "Yes" radio button', async ({ radioButtonPage }) => {
    await radioButtonPage.selectYes();
    expect(await radioButtonPage.isYesSelected()).toBe(true);
    await radioButtonPage.verifyResultText("Yes");
  });

  test('Positive: Select "Impressive" radio button', async ({
    radioButtonPage,
  }) => {
    await radioButtonPage.selectImpressive();
    expect(await radioButtonPage.isImpressiveSelected()).toBe(true);
    await radioButtonPage.verifyResultText("Impressive");
  });

  test('Negative: Try to select disabled "No" radio button', async ({
    radioButtonPage,
  }) => {
    expect(await radioButtonPage.isNoDisabled()).toBe(true);

    await radioButtonPage.trySelectNo();
    expect(await radioButtonPage.isNoSelected()).toBe(false);

    await radioButtonPage.verifyHiddenResultText();
  });

  test("Switching between options", async ({ radioButtonPage }) => {
    await radioButtonPage.selectYes();
    expect(await radioButtonPage.isYesSelected()).toBe(true);

    await radioButtonPage.selectImpressive();
    expect(await radioButtonPage.isYesSelected()).toBe(false);
    expect(await radioButtonPage.isImpressiveSelected()).toBe(true);

    await radioButtonPage.selectYes();
    expect(await radioButtonPage.isImpressiveSelected()).toBe(false);
    expect(await radioButtonPage.isYesSelected()).toBe(true);
  });

  test("Verify initial state", async ({ radioButtonPage }) => {
    await radioButtonPage.verifyQuestionText();
    expect(await radioButtonPage.isYesSelected()).toBe(false);
    expect(await radioButtonPage.isImpressiveSelected()).toBe(false);
    expect(await radioButtonPage.isNoSelected()).toBe(false);
    await radioButtonPage.verifyHiddenResultText();
  });
});

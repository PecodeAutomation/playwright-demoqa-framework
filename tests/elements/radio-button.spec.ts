import { expect } from "@playwright/test";
import { test } from "../../fixtures/ElementsFixtures";
import { RADIO_BUTTON_MESSAGES } from "../../constants/messages/elements";

test.describe("Elements - Radio Button page", () => {
  test('Positive: Select "Yes" radio button', async ({ radioButtonPage }) => {
    await radioButtonPage.selectYes();
    expect(await radioButtonPage.isYesSelected()).toBe(true);
    await radioButtonPage.verifyResultText(RADIO_BUTTON_MESSAGES.yes);
  });

  test('Positive: Select "Impressive" radio button', async ({
    radioButtonPage,
  }) => {
    await radioButtonPage.selectImpressive();
    expect(await radioButtonPage.isImpressiveSelected()).toBe(true);
    await radioButtonPage.verifyResultText(RADIO_BUTTON_MESSAGES.impressive);
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

import { test } from "../../fixtures/ElementsFixtures";
import { RADIO_BUTTON_MESSAGES } from "../../constants/messages/elements";

test.describe("Radio Button Functionality", () => {
  test('Positive: Select "Yes" radio button', async ({ radioButtonPage }) => {
    await radioButtonPage.verifyBaseComponents();
    await radioButtonPage.selectAndVerify(RADIO_BUTTON_MESSAGES.yes);
  });

  test('Positive: Select "Impressive" radio button', async ({
    radioButtonPage,
  }) => {
    await radioButtonPage.verifyBaseComponents();
    await radioButtonPage.selectAndVerify(RADIO_BUTTON_MESSAGES.impressive);
  });

  test('Negative: Try to select disabled "No" radio button', async ({
    radioButtonPage,
  }) => {
    await radioButtonPage.verifyBaseComponents();
    await radioButtonPage.assertNoDisabled();
    await radioButtonPage.selectAndVerify(RADIO_BUTTON_MESSAGES.no);
  });

  test("Switching between options", async ({ radioButtonPage }) => {
    await radioButtonPage.verifyBaseComponents();
    await radioButtonPage.selectYes();
    await radioButtonPage.assertYesSelected();

    await radioButtonPage.selectImpressive();
    await radioButtonPage.assertYesSelected(false);
    await radioButtonPage.assertImpressiveSelected();
    
    await radioButtonPage.selectYes();
    await radioButtonPage.assertImpressiveSelected(false);
    await radioButtonPage.assertYesSelected();
  });

  test("Verify initial state", async ({ radioButtonPage }) => {
    await radioButtonPage.verifyBaseComponents();
    await radioButtonPage.verifyQuestionText();
    await radioButtonPage.assertInitialState();
  });
});

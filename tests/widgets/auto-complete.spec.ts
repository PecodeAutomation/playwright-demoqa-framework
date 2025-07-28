import { COLORS } from "../../constants/common";
import { test } from "../../fixtures/WidgetsFixtures";
import { AutoComplete } from "../../types/widgets";

test.describe("Auto Complete Functionality", () => {
  test("Verify single color selection", async ({ autoCompletePage }) => {
    await autoCompletePage.verifyBaseComponents();
    await autoCompletePage.typeSingleColor(COLORS.red);
    await autoCompletePage.verifySingleColor(COLORS.red);
  });

  test("Verify multiple color selection", async ({ autoCompletePage }) => {
    const colors = [COLORS.red, COLORS.green, COLORS.blue];

    await autoCompletePage.verifyBaseComponents();
    await autoCompletePage.typeMultipleColors(colors);
    await autoCompletePage.verifyMultipleColors(colors);
  });

  test("Verify color removal from multiple selection", async ({
    autoCompletePage,
  }) => {
    const colors = [COLORS.red, COLORS.green, COLORS.blue];

    await autoCompletePage.verifyBaseComponents();
    await autoCompletePage.typeMultipleColors(colors);
    await autoCompletePage.removeMultipleColor(AutoComplete.FIRST_ELEMENT);
    await autoCompletePage.verifyMultipleColors([COLORS.red, COLORS.blue]);
  });

  test("Verify clearing all colors from multiple selection", async ({
    autoCompletePage,
  }) => {
    const colors = [COLORS.red, COLORS.green, COLORS.blue];

    await autoCompletePage.verifyBaseComponents();
    await autoCompletePage.typeMultipleColors(colors);
    await autoCompletePage.clearMultipleInput();
    await autoCompletePage.verifyMultipleColors([]);
  });

  test("Verify suggestions appear when typing", async ({
    autoCompletePage,
  }) => {
    await autoCompletePage.verifyBaseComponents();
    await autoCompletePage.typeSingleColor("re");
    await autoCompletePage.verifySingleColor(COLORS.red);
  });
});

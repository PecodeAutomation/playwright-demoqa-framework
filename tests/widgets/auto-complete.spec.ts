import { expect } from "@playwright/test";
import { COLORS } from "../../constants/common";
import { test } from "../../fixtures/WidgetsFixtures";

test.describe("Widgets - Auto Complete page", () => {
  test("Verify single color selection", async ({ autoCompletePage }) => {
    await autoCompletePage.typeSingleColor(COLORS.red);
    await autoCompletePage.verifySingleColor(COLORS.red);
  });

  test("Verify multiple color selection", async ({ autoCompletePage }) => {
    const colors = [COLORS.red, COLORS.green, COLORS.blue];
    await autoCompletePage.typeMultipleColors(colors);
    await autoCompletePage.verifyMultipleColors(colors);
  });

  test("Verify color removal from multiple selection", async ({
    autoCompletePage,
  }) => {
    const colors = [COLORS.red, COLORS.green, COLORS.blue];
    await autoCompletePage.typeMultipleColors(colors);

    await autoCompletePage.removeMultipleColor(1);
    await autoCompletePage.verifyMultipleColors([COLORS.red, COLORS.blue]);
  });

  test("Verify clearing all colors from multiple selection", async ({
    autoCompletePage,
  }) => {
    const colors = [COLORS.red, COLORS.green, COLORS.blue];
    await autoCompletePage.typeMultipleColors(colors);

    await autoCompletePage.clearMultipleInput();
    await autoCompletePage.verifyMultipleColors([]);
  });

  test("Verify suggestions appear when typing", async ({
    autoCompletePage,
  }) => {
    await autoCompletePage.typeSingleColor("re");
    await autoCompletePage.verifySingleColor(COLORS.red);
  });
});

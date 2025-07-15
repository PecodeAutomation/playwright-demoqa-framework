import { expect } from "@playwright/test";
import { test } from "../../fixtures/ElementsFixtures";

test.describe("Elements - Dynamic Properties page", () => {
  test("Button becomes enabled after 5 seconds", async ({
    dynamicPropertiesPage,
  }) => {
    const button = await dynamicPropertiesPage.verifyButtonBecomesEnabled();
    await expect(button).toBeEnabled();
  });

  test("Button color changes", async ({ dynamicPropertiesPage }) => {
    const { initialColor, finalColor } =
      await dynamicPropertiesPage.verifyButtonColorChange();
    expect(initialColor).not.toBe(finalColor);
  });

  test("Button appears after 5 seconds", async ({ dynamicPropertiesPage }) => {
    const button = await dynamicPropertiesPage.verifyButtonAppears();
    await expect(button).toBeVisible();
  });
});

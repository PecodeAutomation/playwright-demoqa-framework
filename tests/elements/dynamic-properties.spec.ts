import { test } from "../../fixtures/ElementsFixtures";

test.describe("Dynamic Properties Functionality", () => {
  test("Button becomes enabled after 5 seconds", async ({
    dynamicPropertiesPage,
  }) => {
    await dynamicPropertiesPage.verifyBaseComponents();
    await dynamicPropertiesPage.verifyButtonBecomesEnabled();
  });

  test("Button color changes", async ({ dynamicPropertiesPage }) => {
    await dynamicPropertiesPage.verifyBaseComponents();
    await dynamicPropertiesPage.verifyButtonColorChange();
  });

  test("Button appears after 5 seconds", async ({ dynamicPropertiesPage }) => {
    await dynamicPropertiesPage.verifyBaseComponents();
    await dynamicPropertiesPage.verifyButtonAppears();
  });
});

import { test } from "../../fixtures/WidgetsFixtures";

test.describe("Menu Functionality", () => {
  test("Should display all menu items", async ({ menuPage }) => {
    await menuPage.verifyBaseComponents();
    await menuPage.verifyMainItemsVisible();
  });

  test("Should show SUB SUB LIST when hovering Main Item 2", async ({
    menuPage,
  }) => {
    await menuPage.verifyBaseComponents();
    await menuPage.verifySubMenuAppears();
  });

  test("Should hide SUB SUB LIST when not hovering", async ({ menuPage }) => {
    await menuPage.verifySubMenuAppears();
    await menuPage.verifySubMenuDisappears();
  });

  test("Only Main Item 2 should have submenu", async ({ menuPage }) => {
    await menuPage.verifyBaseComponents();
    await menuPage.verifyOnlyMainItem2HasSubmenu();
  });

  test("Main Item 1 should not have submenu", async ({ menuPage }) => {
    await menuPage.verifyBaseComponents();
    await menuPage.verifyNoSubMenuForMainItem1();
  });

  test("Main Item 3 should not have submenu", async ({ menuPage }) => {
    await menuPage.verifyBaseComponents();
    await menuPage.verifyNoSubMenuForMainItem3();
  });
});

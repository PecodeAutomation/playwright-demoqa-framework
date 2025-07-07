import { expect } from "@playwright/test";
import { test } from "../../fixtures/ElementsFixtures";

test.describe("Elements - Checkbox page", () => {
  test("Select Home checkbox and verify", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.toggleCheckbox("Home", true);
    await checkBoxPage.verifySelectedItems(["home"]);
  });

  test("Select nested checkboxes", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.toggleCheckbox("Desktop", true);
    await checkBoxPage.toggleCheckbox("Notes", true);
    await checkBoxPage.verifySelectedItems(["desktop", "notes"]);
  });

  test("Toggle checkbox state", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    expect(await checkBoxPage.isChecked("Desktop")).toBe(false);

    await checkBoxPage.toggleCheckbox("Desktop", true);
    expect(await checkBoxPage.isChecked("Desktop")).toBe(true);

    await checkBoxPage.toggleCheckbox("Desktop", false);
    expect(await checkBoxPage.isChecked("Desktop")).toBe(false);
  });

  test("Select multiple items", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.checkItems(["Desktop", "Documents", "Downloads"]);
    await checkBoxPage.verifySelectedItems([
      "desktop",
      "documents",
      "downloads",
    ]);
  });
});

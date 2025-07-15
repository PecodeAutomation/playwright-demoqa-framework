import { expect } from "@playwright/test";
import { test } from "../../fixtures/ElementsFixtures";
import { Checkbox } from "../../types/elements";

test.describe("Elements - Checkbox page", () => {
  test("Select Home checkbox and verify", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.toggleCheckbox(Checkbox.HOME, true);
    await checkBoxPage.verifySelectedItems(["home"]);
  });

  test("Select nested checkboxes", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.checkItem(Checkbox.HOME);
    await checkBoxPage.expandItem("desktop");
    await checkBoxPage.toggleCheckbox(Checkbox.DESKTOP, true);
    await checkBoxPage.toggleCheckbox(Checkbox.NOTES, true);
    await checkBoxPage.verifySelectedItems(["desktop", "notes"]);
  });

  test("Toggle checkbox state", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    expect(await checkBoxPage.isChecked(Checkbox.DESKTOP)).toBe(false);

    await checkBoxPage.toggleCheckbox(Checkbox.DESKTOP, true);
    expect(await checkBoxPage.isChecked(Checkbox.DESKTOP)).toBe(true);

    await checkBoxPage.toggleCheckbox(Checkbox.DESKTOP, false);
    expect(await checkBoxPage.isChecked(Checkbox.DESKTOP)).toBe(false);
  });

  test("Select multiple items", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.checkItems([
      Checkbox.DESKTOP,
      Checkbox.DOCUMENTS,
      Checkbox.DOWNLOADS,
    ]);
    await checkBoxPage.verifySelectedItems([
      "desktop",
      "documents",
      "downloads",
    ]);
  });
});

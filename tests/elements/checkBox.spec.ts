import { test } from "../../fixtures/ElementsFixtures";
import { Checkbox } from "../../types/elements";
import { CheckboxState } from "../../constants/elements";

test.describe("Checkbox Functionality", () => {
  test.beforeEach(async ({ checkBoxPage }) => {
    await checkBoxPage.verifyBaseComponents();
  });
  test("Select Home checkbox and verify", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.toggleCheckbox(Checkbox.HOME, CheckboxState.UNCHECKED);
    await checkBoxPage.verifySelectedItems(["home"]);
  });

  test("Select nested checkboxes", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.checkItem(Checkbox.HOME);
    await checkBoxPage.expandItem("desktop");
    await checkBoxPage.toggleCheckbox(
      Checkbox.DESKTOP,
      CheckboxState.UNCHECKED
    );
    await checkBoxPage.toggleCheckbox(Checkbox.NOTES, CheckboxState.UNCHECKED);
    await checkBoxPage.verifySelectedItems(["desktop", "notes"]);
  });

  test("Toggle checkbox state", async ({ checkBoxPage }) => {
    await checkBoxPage.expandAll();
    await checkBoxPage.verifyCheckboxToggled(
      Checkbox.DESKTOP,
      CheckboxState.CHECKED
    );
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

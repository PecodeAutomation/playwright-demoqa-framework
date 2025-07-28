import { test } from "../../fixtures/WidgetsFixtures";

test.describe("Tool Tips Functionality", () => {
  test.beforeEach(async ({ toolTipsPage }) => {
    await toolTipsPage.verifyBaseComponents();
  });
  test("Button tooltip visibility and text", async ({ toolTipsPage }) => {
    await toolTipsPage.verifyButtonTooltipVisible();
    await toolTipsPage.verifyButtonTooltipText();
  });

  test("Input field tooltip visibility and text", async ({ toolTipsPage }) => {
    await toolTipsPage.verifyInputTooltipVisible();
    await toolTipsPage.verifyInputTooltipText();
  });

  test("Link tooltip visibility and text", async ({ toolTipsPage }) => {
    await toolTipsPage.verifyLinkTooltipVisible();
    await toolTipsPage.verifyLinkTooltipText();
  });

  test("Tooltip disappears when not hovering", async ({ toolTipsPage }) => {
    await toolTipsPage.verifyButtonTooltipVisible();
    await toolTipsPage.verifyTooltipDisappearsAfterMove();
    await toolTipsPage.verifyInputTooltipVisible();
    await toolTipsPage.verifyTooltipDisappearsAfterMove();
  });
});

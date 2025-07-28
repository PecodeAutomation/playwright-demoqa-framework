import { TABS_CONTENT } from "../../constants/widgets";
import { test } from "../../fixtures/WidgetsFixtures";
import { Tabs } from "../../types/widgets";

test.describe("Tabs Functionality", () => {
  test.beforeEach(async ({ tabsPage }) => {
    await tabsPage.verifyBaseComponents();
  });
  test("Should switch between What and Origin tabs", async ({ tabsPage }) => {
    await tabsPage.verifyTabIsActive(Tabs.WHAT);
    await tabsPage.verifyTabContentContains(Tabs.WHAT, TABS_CONTENT.whatTab);

    await tabsPage.switchToTab(Tabs.ORIGIN);
    await tabsPage.verifyTabIsActive(Tabs.ORIGIN);
    await tabsPage.verifyTabContentContains(
      Tabs.ORIGIN,
      TABS_CONTENT.originTab
    );
  });

  test("Should switch to Use tab", async ({ tabsPage }) => {
    await tabsPage.switchToTab(Tabs.USE);
    await tabsPage.verifyTabIsActive(Tabs.USE);
    await tabsPage.verifyTabContentContains(Tabs.USE, TABS_CONTENT.useTab);
  });

  test("Should verify More tab is disabled", async ({ tabsPage }) => {
    await tabsPage.verifyTabIsDisabled(Tabs.MORE);
  });
});

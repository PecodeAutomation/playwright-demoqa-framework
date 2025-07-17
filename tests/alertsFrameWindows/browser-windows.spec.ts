import { ENDPOINTS } from "../../constants/endpoints";
import { BROWSER_WINDOWS_MESSAGES } from "../../constants/messages/alertFrameWindows";
import { test } from "../../fixtures/AlertsFrameWindowsFixtures";

test.describe("Browser Windows Functionality", () => {
  test("New tab functionality", async ({ browserWindowsPage }) => {
    await browserWindowsPage.verifyBaseComponents();
    await browserWindowsPage.verifyNewTab(ENDPOINTS.sample);
  });

  test("New window functionality", async ({ browserWindowsPage }) => {
    await browserWindowsPage.verifyBaseComponents();
    await browserWindowsPage.verifyNewWindow(ENDPOINTS.sample);
  });

  test("Message window functionality", async ({ browserWindowsPage }) => {
    await browserWindowsPage.verifyBaseComponents();
    await browserWindowsPage.verifyMessageWindowText(
      BROWSER_WINDOWS_MESSAGES.knowledgeIncreasesBySharing
    );
  });

  test("All buttons functionality", async ({ browserWindowsPage }) => {
    await browserWindowsPage.verifyBaseComponents();
    await browserWindowsPage.verifyAllButtons(
      ENDPOINTS.sample,
      ENDPOINTS.sample,
      BROWSER_WINDOWS_MESSAGES.knowledgeIncreasesBySharing
    );
  });
});

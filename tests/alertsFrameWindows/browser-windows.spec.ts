import { expect } from "@playwright/test";
import { test } from "../../fixtures/AlertsFrameWindowsFixtures";
import { ENDPOINTS } from "../../constants/endpoints";
import { BROWSER_WINDOWS_MESSAGES } from "../../constants/messages/alertFrameWindows";

test.describe("Alerts, Frame & Windows - Browser Windows page", () => {
  test("Verify New Tab opens correctly", async ({ browserWindowsPage }) => {
    await browserWindowsPage.verifyBaseComponents();
    
    const newPage = await browserWindowsPage.verifyNewTabOpens(
      ENDPOINTS.sample
    );
    expect(newPage.url()).toContain("sample");
  });

  test("Verify New Window opens correctly", async ({ browserWindowsPage }) => {
    await browserWindowsPage.verifyBaseComponents();

    const newPage = await browserWindowsPage.verifyNewWindowOpens(
      ENDPOINTS.sample
    );
    expect(newPage.url()).toContain("sample");
  });

  test("Verify New Window with Message", async ({ browserWindowsPage }) => {
    await browserWindowsPage.verifyBaseComponents();

    const newPage = await browserWindowsPage.verifyNewWindowWithMessage(
      BROWSER_WINDOWS_MESSAGES.knowledgeIncreasesBySharing
    );
    expect(newPage.url()).toBe("about:blank");
  });

  test("Verify all buttons work", async ({ browserWindowsPage }) => {
    await browserWindowsPage.verifyBaseComponents();
    await browserWindowsPage.verifyNewTabOpens(ENDPOINTS.sample);
    await browserWindowsPage.verifyNewWindowOpens(ENDPOINTS.sample);
    await browserWindowsPage.verifyNewWindowWithMessage(
      BROWSER_WINDOWS_MESSAGES.knowledgeIncreasesBySharing
    );
  });
});

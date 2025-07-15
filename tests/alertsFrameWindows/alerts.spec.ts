import { ALERTS_MESSAGES } from "../../constants/messages/alertFrameWindows";
import { test } from "../../fixtures/AlertsFrameWindowsFixtures";

test.describe("Alerts, Frame & Windows - Alerts page", () => {
  test("Verify simple alert", async ({ alertsPage }) => {
    await alertsPage.triggerSimpleAlert();
  });

  test("Verify timer alert", async ({ alertsPage }) => {
    await alertsPage.triggerTimerAlert();
  });

  test("Verify confirm alert - accept", async ({ alertsPage }) => {
    await alertsPage.triggerConfirmAlert(true);
    await alertsPage.verifyConfirmResult(ALERTS_MESSAGES.youSelectedOk);
  });

  test("Verify confirm alert - dismiss", async ({ alertsPage }) => {
    await alertsPage.triggerConfirmAlert(false);
    await alertsPage.verifyConfirmResult(ALERTS_MESSAGES.youSelectedCancel);
  });

  test("Verify prompt alert - with text", async ({ alertsPage }) => {
    const testInput = "Test string";
    await alertsPage.triggerPromptAlert(testInput);
    await alertsPage.verifyPromptResult(`You entered ${testInput}`);
  });
});

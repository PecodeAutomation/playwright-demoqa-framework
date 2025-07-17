import { Alerts, DIALOG_PROMPT } from "../../constants/alertsFrameWindows";
import { ALERTS_MESSAGES } from "../../constants/messages/alertFrameWindows";
import { test } from "../../fixtures/AlertsFrameWindowsFixtures";

test.describe("Alerts, Frame & Windows - Alerts page", () => {
  test("Verify simple alert", async ({ alertsPage }) => {
    await alertsPage.verifyBaseComponents();
    await alertsPage.triggerSimpleAlert();
  });

  test("Verify timer alert", async ({ alertsPage }) => {
    await alertsPage.verifyBaseComponents();
    await alertsPage.triggerTimerAlert();
  });

  test("Verify confirm alert - accept", async ({ alertsPage }) => {
    await alertsPage.verifyBaseComponents();
    await alertsPage.triggerConfirmAlert(Alerts.DIALOG_ACCEPT);
    await alertsPage.verifyConfirmResult(ALERTS_MESSAGES.youSelectedOk);
  });

  test("Verify confirm alert - dismiss", async ({ alertsPage }) => {
    await alertsPage.verifyBaseComponents();
    await alertsPage.triggerConfirmAlert(Alerts.DIALOG_DISMISS);
    await alertsPage.verifyConfirmResult(ALERTS_MESSAGES.youSelectedCancel);
  });

  test("Verify prompt alert - with text", async ({ alertsPage }) => {
    await alertsPage.verifyBaseComponents();
    await alertsPage.triggerPromptAlert(DIALOG_PROMPT.simpleText);
    await alertsPage.verifyPromptResult(
      `You entered ${DIALOG_PROMPT.simpleText}`
    );
  });
});

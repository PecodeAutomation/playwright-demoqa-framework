export const Alerts = {
  DIALOG_ACCEPT: true,
  DIALOG_DISMISS: false,
} as const;

export const DIALOG_PROMPT = Object.freeze({
  simpleText: "Test1234567890",
});

export type AlertsFrameWindowsBooleanKeys = keyof typeof Alerts;

export type AlertsFrameWindowsBooleanValues =
  (typeof Alerts)[keyof typeof Alerts];

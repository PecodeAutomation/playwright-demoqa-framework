import { test as base } from "@playwright/test";
import { AlertsFrameWindowsNavigationService } from "../services/AlertsFrameWindowsNavigationService";
import { BrowserWindowsPage } from "../pages/alertsFrameWindows/BrowserWindowsPage";
import { AlertsPage } from "../pages/alertsFrameWindows/AlertsPage";
import { FramesPage } from "../pages/alertsFrameWindows/FramesPage";


export type PageFixtures = {
  alertsFrameWindowsNavigationService: AlertsFrameWindowsNavigationService;
  browserWindowsPage: BrowserWindowsPage;
  alertsPage: AlertsPage;
  framesPage: FramesPage;
};

export const test = base.extend<PageFixtures>({
  alertsFrameWindowsNavigationService: async ({ page }, use) => {
    const service = new AlertsFrameWindowsNavigationService(page);
    await use(service);
  },

  browserWindowsPage: async ({ alertsFrameWindowsNavigationService }, use) => {
    const browserWindowsPage = await alertsFrameWindowsNavigationService.openBrowserWindows();
    await use(browserWindowsPage);
  },

  alertsPage: async ({ alertsFrameWindowsNavigationService }, use) => {
    const alertsPage = await alertsFrameWindowsNavigationService.openAlerts();
    await use(alertsPage);
  },

  framesPage: async ({ alertsFrameWindowsNavigationService }, use) => {
    const framesPage = await alertsFrameWindowsNavigationService.openFrames();
    await use(framesPage);
  },
});
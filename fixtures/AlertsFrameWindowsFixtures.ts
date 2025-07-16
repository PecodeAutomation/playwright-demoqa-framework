import { test as base } from "@playwright/test";
import { AlertsFrameWindowsNavigationService } from "../services/AlertsFrameWindowsNavigationService";
import { BrowserWindowsPage } from "../pages/alertsFrameWindows/BrowserWindowsPage";
import { AlertsPage } from "../pages/alertsFrameWindows/AlertsPage";
import { FramesPage } from "../pages/alertsFrameWindows/FramesPage";
import { NestedFramesPage } from "../pages/alertsFrameWindows/NestedFramesPage";
import { ModalDialogsPage } from "../pages/alertsFrameWindows/ModalDialogsPage";

export type PageFixtures = {
  alertsFrameWindowsNavigationService: AlertsFrameWindowsNavigationService;
  browserWindowsPage: BrowserWindowsPage;
  alertsPage: AlertsPage;
  framesPage: FramesPage;
  nestedFramesPage: NestedFramesPage;
  modalDialogsPage: ModalDialogsPage;
};

export const test = base.extend<PageFixtures>({
  alertsFrameWindowsNavigationService: async ({ page }, use) => {
    const service = new AlertsFrameWindowsNavigationService(page);
    await use(service);
  },

  browserWindowsPage: async ({ alertsFrameWindowsNavigationService }, use) => {
    const browserWindowsPage =
      await alertsFrameWindowsNavigationService.openBrowserWindows();
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

  nestedFramesPage: async ({ alertsFrameWindowsNavigationService }, use) => {
    const nestedFramesPage = await alertsFrameWindowsNavigationService.openNestedFrames();
    await use(nestedFramesPage);
  },

  modalDialogsPage: async ({ alertsFrameWindowsNavigationService }, use) => {
    const modalDialogsPage = await alertsFrameWindowsNavigationService.openModalDialogs();
    await use(modalDialogsPage);
  },
});

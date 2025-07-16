import { Accordion } from "../components/navigation/Accordion";
import { Page } from "@playwright/test";
import { NavigationGroups } from "../types/navigation";
import { BrowserWindowsPage } from "../pages/alertsFrameWindows/BrowserWindowsPage";
import { AlertsFrameWindows } from "../types/alerts-frame-windows";
import { AlertsPage } from "../pages/alertsFrameWindows/AlertsPage";
import { FramesPage } from "../pages/alertsFrameWindows/FramesPage";
import { NestedFramesPage } from "../pages/alertsFrameWindows/NestedFramesPage";
import { ModalDialogsPage } from "../pages/alertsFrameWindows/ModalDialogsPage";

export class AlertsFrameWindowsNavigationService {
  constructor(private page: Page) {}

  async openBrowserWindows(): Promise<BrowserWindowsPage> {
    await this.page.goto("");
    const alertsFrameWindowsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ALERTS_FRAME_WINDOWS
    );
    await alertsFrameWindowsGroup.navigateTo(
      AlertsFrameWindows.BROWSER_WINDOWS
    );
    return new BrowserWindowsPage(this.page);
  }

  async openAlerts(): Promise<AlertsPage> {
    await this.page.goto("");
    const alertsFrameWindowsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ALERTS_FRAME_WINDOWS
    );
    await alertsFrameWindowsGroup.navigateTo(AlertsFrameWindows.ALERTS);
    return new AlertsPage(this.page);
  }

  async openFrames(): Promise<FramesPage> {
    await this.page.goto("");
    const alertsFrameWindowsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ALERTS_FRAME_WINDOWS
    );
    await alertsFrameWindowsGroup.navigateTo(AlertsFrameWindows.FRAMES);
    return new FramesPage(this.page);
  }

  async openNestedFrames(): Promise<NestedFramesPage> {
    await this.page.goto("");
    const alertsFrameWindowsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ALERTS_FRAME_WINDOWS
    );
    await alertsFrameWindowsGroup.navigateTo(AlertsFrameWindows.NESTED_FRAMES);
    return new NestedFramesPage(this.page);
  }

  async openModalDialogs(): Promise<ModalDialogsPage> {
    await this.page.goto("");
    const alertsFrameWindowsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ALERTS_FRAME_WINDOWS
    );
    await alertsFrameWindowsGroup.navigateTo(AlertsFrameWindows.MODAL_DIALOGS);
    return new ModalDialogsPage(this.page);
  }
}

import { Page } from "@playwright/test";
import { NavigationGroup } from "./NavigationGroup";
import { ElementsGroup } from "./groups/ElementsGroup";
import { FormsGroup } from "./groups/FormsGroup";
import { NavigationGroups } from "../../types/navigation";
import { AlertsFrameWindowsGroup } from "./groups/AlertsFrameWindowsGroup";
import { WidgetsGroup } from "./groups/WidgetsGroup";

export class Accordion {
  constructor(private readonly page: Page) {}

  getGroup(groupName: string): NavigationGroup {
    switch (groupName) {
      case NavigationGroups.ELEMENTS:
        return new ElementsGroup(this.page, groupName);
      case NavigationGroups.FORMS:
        return new FormsGroup(this.page, groupName);
      case NavigationGroups.ALERTS_FRAME_WINDOWS:
        return new AlertsFrameWindowsGroup(this.page, groupName);
      case NavigationGroups.WIDGETS:
        return new WidgetsGroup(this.page, groupName);  
      default:
        throw new Error(`Unknown group: ${groupName}`);
    }
  }
}

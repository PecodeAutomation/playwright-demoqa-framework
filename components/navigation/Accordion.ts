import { Page } from "@playwright/test";
import { NavigationGroup } from "./NavigationGroup";
import { ElementsGroup } from "./groups/ElementsGroup";
import { FormsGroup } from "./groups/FormsGroup";
import { NavigationGroups } from "../../types/navigation";

export class Accordion {
  constructor(private readonly page: Page) {}

  getGroup(groupName: string): NavigationGroup {
    switch (groupName) {
      case NavigationGroups.ELEMENTS:
        return new ElementsGroup(this.page, groupName);
      case NavigationGroups.FORMS:
        return new FormsGroup(this.page, groupName);  
      default:
        throw new Error(`Unknown group: ${groupName}`);
    }
  }
}
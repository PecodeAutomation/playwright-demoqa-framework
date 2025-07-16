import { expect, FrameLocator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { NestedFramesContent } from "../../types/alerts-frame-windows";

export class NestedFramesPage extends BasePage {
  private readonly mainFrame: FrameLocator;
  private readonly childFrame: FrameLocator;

  constructor(page: Page) {
    super(page);
    this.mainFrame = page.frameLocator("#frame1");
    this.childFrame = this.mainFrame.frameLocator('iframe[srcdoc="<p>Child Iframe</p>"]');
  }

  async verifyParentFrameText() {
    const parentText = await this.mainFrame.locator("body").textContent();
    expect(parentText?.trim()).toBe(NestedFramesContent.PARENT_CONTENT);
    return parentText;
  }

  async verifyChildFrameText() {
    const childText = await this.childFrame.locator("body").textContent();
    expect(childText?.trim()).toBe(NestedFramesContent.CHILD_CONTENT);
    return childText;
  }

  async verifyFramesHierarchy() {
    return {
      parent: await this.verifyParentFrameText(),
      child: await this.verifyChildFrameText()
    };
  }
}

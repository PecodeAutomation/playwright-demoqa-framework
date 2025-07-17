import { FrameLocator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { NestedFramesContent } from "../../types/alerts-frame-windows";

export class NestedFramesPage extends BasePage {
  private readonly mainFrame = this.page.frameLocator("#frame1");
  private readonly childFrame = this.mainFrame.frameLocator(
    'iframe[srcdoc="<p>Child Iframe</p>"]'
  );

  async verifyParentFrameContent() {
    const content = await this.getFrameContent(this.mainFrame);
    this.validateContent(content, NestedFramesContent.PARENT_CONTENT);
    return content;
  }

  async verifyChildFrameContent() {
    const content = await this.getFrameContent(this.childFrame);
    this.validateContent(content, NestedFramesContent.CHILD_CONTENT);
    return content;
  }

  async verifyFullHierarchy() {
    return {
      parent: await this.verifyParentFrameContent(),
      child: await this.verifyChildFrameContent(),
    };
  }

  private async getFrameContent(frame: FrameLocator) {
    const content = await frame.locator("body").textContent();
    return content?.trim() ?? "";
  }

  private validateContent(actual: string, expected: string) {
    if (actual !== expected) {
      throw new Error(
        `Expected frame content to be '${expected}', but got '${actual}'`
      );
    }
  }
}

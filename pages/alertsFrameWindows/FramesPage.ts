import { FrameLocator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { FrameContent } from "../../types/alerts-frame-windows";

export class FramesPage extends BasePage {
  private readonly frame1 = this.page.frameLocator("#frame1");
  private readonly frame2 = this.page.frameLocator("#frame2");
  private readonly framesHeading = this.page
    .locator("#framesWrapper div")
    .first();

  async verifyAllFramesContent() {
    const results = {
      mainPage: await this.verifyMainPageContent(
        FrameContent.MAIN_PAGE_CONTENT
      ),
      frame1: await this.verifyFrameContent(
        this.frame1,
        FrameContent.FRAME_ONE_CONTENT
      ),
      frame2: await this.verifyFrameContent(
        this.frame2,
        FrameContent.FRAME_TWO_CONTENT
      ),
    };
    return results;
  }

  async verifySingleFrame(
    frame: "frame1" | "frame2",
    expectedContent: string
  ) {
    const frameLocator = frame === "frame1" ? this.frame1 : this.frame2;
    const content = await this.verifyFrameContent(
      frameLocator,
      expectedContent
    );
    return { content };
  }

  private async verifyFrameContent(
    frame: FrameLocator,
    expectedContent: string
  ) {
    const frameHeading = frame.getByRole("heading", {
      name: "This is a sample page",
    });
    const content = await frameHeading.textContent();
    if (content !== expectedContent) {
      throw new Error(
        `Expected frame content to be '${expectedContent}', but got '${content}'`
      );
    }
    return content;
  }

  private async verifyMainPageContent(expectedContent: string) {
    const content = await this.framesHeading.textContent();
    if (!content?.includes(expectedContent)) {
      throw new Error(
        `Expected main page to contain '${expectedContent}', but got '${content}'`
      );
    }
    return content;
  }
}

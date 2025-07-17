import { expect } from "@playwright/test";
import { test } from "../../fixtures/AlertsFrameWindowsFixtures";
import { FrameContent } from "../../types/alerts-frame-windows";

test.describe("Alerts, Frame & Windows - Frames page", () => {
  test("Verify Frame 1 content", async ({ framesPage }) => {
    await framesPage.verifyBaseComponents();

    const frameText = await framesPage.verifyFrame1Content();
    expect(frameText).toBe(FrameContent.FRAME_ONE_CONTENT);
  });

  test("Verify Frame 2 content", async ({ framesPage }) => {
    await framesPage.verifyBaseComponents();

    const frameText = await framesPage.verifyFrame2Content();
    expect(frameText).toBe(FrameContent.FRAME_TWO_CONTENT);
  });

  test("Switch between frames and main page", async ({ framesPage }) => {
    await framesPage.verifyBaseComponents();
    
    const mainText = await framesPage.verifyMainPageContent();
    expect(mainText).toContain(FrameContent.MAIN_PAGE_CONTENT);

    const frame1Text = await framesPage.verifyFrame1Content();
    expect(frame1Text).toBe(FrameContent.FRAME_ONE_CONTENT);

    const frame2Text = await framesPage.verifyFrame2Content();
    expect(frame2Text).toBe(FrameContent.FRAME_TWO_CONTENT);

    const mainTextAgain = await framesPage.verifyMainPageContent();
    expect(mainTextAgain).toContain(FrameContent.MAIN_PAGE_CONTENT);
  });
});

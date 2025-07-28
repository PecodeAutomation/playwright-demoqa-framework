import { test } from "../../fixtures/AlertsFrameWindowsFixtures";
import { FrameContent } from "../../types/alerts-frame-windows";

test.describe("Frames Functionality", () => {
  test.beforeEach(async ({ framesPage }) => {
    await framesPage.verifyBaseComponents();
  });
  test("Frame 1 contains correct content", async ({ framesPage }) => {
    await framesPage.verifySingleFrame(
      "frame1",
      FrameContent.FRAME_ONE_CONTENT
    );
  });

  test("Frame 2 contains correct content", async ({ framesPage }) => {
    await framesPage.verifySingleFrame(
      "frame2",
      FrameContent.FRAME_TWO_CONTENT
    );
  });

  test("All frames and main page content", async ({ framesPage }) => {
    await framesPage.verifyAllFramesContent();
  });
});

import { test } from "../../fixtures/AlertsFrameWindowsFixtures";

test.describe("Nested Frames Functionality", () => {
  test("Parent frame contains correct content", async ({
    nestedFramesPage,
  }) => {
    await nestedFramesPage.verifyBaseComponents();
    await nestedFramesPage.verifyParentFrameContent();
  });

  test("Child frame contains correct content", async ({ nestedFramesPage }) => {
    await nestedFramesPage.verifyBaseComponents();
    await nestedFramesPage.verifyChildFrameContent();
  });

  test("Full frames hierarchy verification", async ({ nestedFramesPage }) => {
    await nestedFramesPage.verifyBaseComponents();
    await nestedFramesPage.verifyFullHierarchy();
  });
});

import { expect } from "@playwright/test";
import { test } from "../../fixtures/AlertsFrameWindowsFixtures";
import { NestedFramesContent } from "../../types/alerts-frame-windows";


test.describe("Alerts, Frame & Windows - Nested Frames page", () => {
  test("Verify parent frame content", async ({nestedFramesPage}) => {
    await nestedFramesPage.verifyBaseComponents();

    const text = await nestedFramesPage.verifyParentFrameText();
    expect(text).toBe(NestedFramesContent.PARENT_CONTENT);
  });

  test("Verify child frame content", async ({nestedFramesPage}) => {
    await nestedFramesPage.verifyBaseComponents();

    const text = await nestedFramesPage.verifyChildFrameText();
    expect(text).toBe(NestedFramesContent.CHILD_CONTENT);
  });

  test("Verify full hierarchy", async ({nestedFramesPage}) => {
    await nestedFramesPage.verifyBaseComponents();
    
    const { parent, child } = await nestedFramesPage.verifyFramesHierarchy();
    expect(parent).toBe(NestedFramesContent.PARENT_CONTENT);
    expect(child).toBe(NestedFramesContent.CHILD_CONTENT);
  });
});

import { test } from "../../fixtures/ElementsFixtures";

test.describe("Elements - Broken Links/Images page", () => {
  test("Verify images", async ({ brokenLinksImagesPage }) => {
    await brokenLinksImagesPage.verifyImages();
  });

  test("Verify links", async ({ brokenLinksImagesPage }) => {
    await brokenLinksImagesPage.verifyLinks();
  });

  test("Complete page verification", async ({ brokenLinksImagesPage }) => {
    await brokenLinksImagesPage.verifyAllElements();
  });
});

import { test } from "../../fixtures/ElementsFixtures";

test.describe("Broken Links/Images Functionality", () => {
  test.beforeEach(async ({ brokenLinksImagesPage }) => {
    await brokenLinksImagesPage.verifyBaseComponents();
  });
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

import { LINKS, URL } from "../../constants/common";
import { test } from "../../fixtures/ElementsFixtures";

test.describe("Links Functionality", () => {
  test("Home link should open new tab", async ({ linksPage }) => {
    await linksPage.verifyBaseComponents();
    await linksPage.clickHomeLink();
    await linksPage.verifyNewTabOpened(URL.body);
  });

  test("HomeDYNAMIC link should open new tab", async ({ linksPage }) => {
    await linksPage.verifyBaseComponents();
    await linksPage.clickHomeDynamicLink();
    await linksPage.verifyNewTabOpened(URL.body);
  });

  test.describe("Links API Tests", () => {
    test("Check all API links", async ({ linksPage }) => {
      for (const link of LINKS) {
        await linksPage.verifyBaseComponents();
        await linksPage.verifyLinkResponse(
          link.name,
          link.status,
          link.statusText
        );
      }
    });
  });
});

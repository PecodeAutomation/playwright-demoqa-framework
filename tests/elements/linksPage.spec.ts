import { test } from "../../fixtures/ElementsFixtures";

test.describe("Links Page Tests", () => {
  test("Home link should open new tab", async ({ linksPage }) => {
    await linksPage.clickHomeLink();
    await linksPage.verifyNewTabOpened("demoqa.com");
  });

  test("HomeDYNAMIC link should open new tab", async ({ linksPage }) => {
    await linksPage.clickHomeDynamicLink();
    await linksPage.verifyNewTabOpened("demoqa.com");
  });

  test.describe("Links API Tests", () => {
    const links = [
      { name: "Created", status: 201, statusText: "Created" },
      { name: "No Content", status: 204, statusText: "No Content" },
      { name: "Moved", status: 301, statusText: "Moved Permanently" },
      { name: "Bad Request", status: 400, statusText: "Bad Request" },
      { name: "Unauthorized", status: 401, statusText: "Unauthorized" },
      { name: "Forbidden", status: 403, statusText: "Forbidden" },
      { name: "Invalid-url", status: 404, statusText: "Not Found" },
    ];

    test("Check all API links", async ({ linksPage }) => {
      for (const link of links) {
        await linksPage.verifyLinkResponse(
          link.name,
          link.status,
          link.statusText
        );
      }
    });
  });
});

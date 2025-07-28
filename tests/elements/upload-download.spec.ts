import { FILES } from "../../constants/common";
import { test } from "../../fixtures/ElementsFixtures";

test.describe("Upload and Download Functionality", () => {
  test.beforeEach(async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.verifyBaseComponents();
  });
  test.afterEach(async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.clearDownloads();
  });

  test("Upload test file", async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.uploadTestFile(FILES.uploadFile);
  });

  test("Download and verify file", async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.verifyDownloadedFile(FILES.downloadFile);
  });
});

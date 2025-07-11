import { test } from "../../fixtures/ElementsFixtures";

test.describe("Elements - Upload and Download page", () => {
  const UPLOAD_FILE = "Test-Logo.svg.png";
  const DOWNLOAD_FILE = "sampleFile.jpeg";

  test.afterEach(async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.clearDownloads();
  });

  test("Upload test file", async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.uploadTestFile(UPLOAD_FILE);
  });

  test("Download and verify file", async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.verifyDownloadedFile(DOWNLOAD_FILE);
  });
});

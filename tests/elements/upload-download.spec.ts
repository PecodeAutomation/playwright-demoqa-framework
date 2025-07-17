import { FILES } from "../../constants/common";
import { test } from "../../fixtures/ElementsFixtures";

test.describe("Elements - Upload and Download page", () => {
  test.afterEach(async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.clearDownloads();
  });

  test("Upload test file", async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.verifyBaseComponents();
    await uploadDownloadPage.uploadTestFile(FILES.uploadFile);
  });

  test("Download and verify file", async ({ uploadDownloadPage }) => {
    await uploadDownloadPage.verifyBaseComponents();
    await uploadDownloadPage.verifyDownloadedFile(FILES.downloadFile);
  });
});

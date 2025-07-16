import { expect, Locator, Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { BasePage } from "../BasePage";

export class UploadDownloadPage extends BasePage {
  private readonly downloadButton: Locator;
  private readonly uploadButton: Locator;
  private readonly uploadFilePath: Locator;
  private readonly testDataDir = path.join(__dirname, "../../test-data");
  private readonly downloadsDir = path.join(__dirname, "../../downloads");

  constructor(page: Page) {
    super(page);
    this.downloadButton = page.locator("#downloadButton");
    this.uploadButton = page.locator("#uploadFile");
    this.uploadFilePath = page.locator("#uploadedFilePath");

    [this.testDataDir, this.downloadsDir].forEach((dir) => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });
  }

  async downloadFile(timeout = 30000) {
    try {
      await this.downloadButton.waitFor({ state: "visible", timeout });

      const downloadPromise = this.page.waitForEvent("download", { timeout });
      await this.downloadButton.click();

      const download = await downloadPromise;
      const fileName = download.suggestedFilename();
      const savePath = path.join(this.downloadsDir, fileName);

      if (!fs.existsSync(this.downloadsDir)) {
        fs.mkdirSync(this.downloadsDir, { recursive: true });
      }

      await download.saveAs(savePath);
      await this.page.waitForTimeout(1000);
      if (!fs.existsSync(savePath)) {
        throw new Error(`File was not saved to ${savePath}`);
      }

      return {
        path: savePath,
        name: fileName,
        size: fs.statSync(savePath).size,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Download failed: ${error.message}`);
      }
      throw new Error("Download failed: Unknown error");
    }
  }

  async verifyDownloadedFile(expectedFileName: string) {
    const result = await this.downloadFile();

    expect(result.name).toBe(expectedFileName);
    expect(result.size).toBeGreaterThan(0);

    return result;
  }

  async uploadTestFile(filename: string) {
    const filePath = path.join(this.testDataDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Test file not found at: ${filePath}`);
    }

    await this.uploadButton.setInputFiles(filePath);
    await expect(this.uploadFilePath).toContainText(filename);
  }

  async clearDownloads() {
    if (fs.existsSync(this.downloadsDir)) {
      fs.rmSync(this.downloadsDir, { recursive: true });
    }
  }
}

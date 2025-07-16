import { Page, Locator } from "@playwright/test";

export class ModalDialog {
  private readonly page: Page;
  private readonly modalTitle: Locator;
  private readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modalTitle = page.locator(".modal-title");
    this.closeButton = page.locator(".modal-close-button");
  }

  async getTitleText(): Promise<string> {
    return this.modalTitle.innerText();
  }

  async closeModal() {
    await this.closeButton.click();
  }
}

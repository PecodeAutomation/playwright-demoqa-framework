import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ModalDialogsPage extends BasePage {
  private readonly smallModalBtn: Locator;
  private readonly largeModalBtn: Locator;
  private readonly modalTitle: Locator;
  private readonly modalBody: Locator;
  private readonly closeModalBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.smallModalBtn = page.locator("#showSmallModal");
    this.largeModalBtn = page.locator("#showLargeModal");
    this.modalTitle = page.locator(".modal-title");
    this.modalBody = page.locator(".modal-body");
    this.closeModalBtn = page.locator(".close");
  }

  async openSmallModal() {
    await this.smallModalBtn.click();
    await expect(this.modalTitle).toBeVisible();
    return {
      title: await this.modalTitle.textContent(),
      body: await this.modalBody.textContent(),
    };
  }

  async openLargeModal() {
    await this.largeModalBtn.click();
    await expect(this.modalTitle).toBeVisible();
    return {
      title: await this.modalTitle.textContent(),
      body: await this.modalBody.textContent(),
    };
  }

  async closeModal() {
    await this.closeModalBtn.click();
    await expect(this.modalTitle).toBeHidden();
  }

  async verifyModalContent(type: "small" | "large") {
    const modal =
      type === "small"
        ? await this.openSmallModal()
        : await this.openLargeModal();

    expect(modal.title).toBeTruthy();
    expect(modal.body).toBeTruthy();

    await this.closeModal();
    return modal;
  }
}

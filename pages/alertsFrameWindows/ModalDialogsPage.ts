import { BasePage } from "../BasePage";
import { ModalDialogContent } from "../../types/alerts-frame-windows";

export class ModalDialogsPage extends BasePage {
  private readonly smallModalBtn = this.page.locator("#showSmallModal");
  private readonly largeModalBtn = this.page.locator("#showLargeModal");
  private readonly modalTitle = this.page.locator(".modal-title");
  private readonly modalBody = this.page.locator(".modal-body");
  private readonly closeModalBtn = this.page.locator(".close");

  async verifySmallModal() {
    const modal = await this.openSmallModal();
    this.verifyModalContent(modal, {
      title: ModalDialogContent.SMALL_TITLE,
      body: ModalDialogContent.SMALL_BODY
    });
    await this.closeModal();
    return modal;
  }

  async verifyLargeModal() {
    const modal = await this.openLargeModal();
    this.verifyModalContent(modal, {
      title: ModalDialogContent.LARGE_TITLE,
      body: ModalDialogContent.LARGE_BODY
    });
    await this.closeModal();
    return modal;
  }

  async verifyAllModalsWorkflow() {
    const results = {
      smallModal: await this.verifySmallModal(),
      largeModal: await this.verifyLargeModal()
    };
    return results;
  }

  private async openSmallModal() {
    await this.smallModalBtn.click();
    await this.waitForModalVisible();
    return this.getModalContent();
  }

  private async openLargeModal() {
    await this.largeModalBtn.click();
    await this.waitForModalVisible();
    return this.getModalContent();
  }

  private async waitForModalVisible() {
    await this.modalTitle.waitFor({ state: "visible" });
  }

  private async getModalContent() {
    return {
      title: await this.modalTitle.textContent() ?? '',
      body: await this.modalBody.textContent() ?? ''
    };
  }

  private verifyModalContent(
    actual: { title: string; body: string },
    expected: { title: string; body: string }
  ) {
    if (actual.title !== expected.title) {
      throw new Error(`Expected title '${expected.title}', but got '${actual.title}'`);
    }
    if (!actual.body.includes(expected.body)) {
      throw new Error(`Expected body to contain '${expected.body}', but got '${actual.body}'`);
    }
  }

  private async closeModal() {
    await this.closeModalBtn.click();
    await this.modalTitle.waitFor({ state: "hidden" });
  }
}

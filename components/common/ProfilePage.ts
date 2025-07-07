import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../pages/BasePage";

export class ProfilePage extends BasePage {
  private readonly deleteAllBooksButton: Locator;
  private readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.deleteAllBooksButton = page.locator('button:text("Delete All Books")');
    this.confirmDeleteButton = page.locator("#closeSmallModal-ok");
  }

  async deleteAllBooks() {
    await this.deleteAllBooksButton.click();
    await this.confirmDeleteButton.click();
  }
}

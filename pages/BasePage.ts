import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(path: string = "") {
    await this.page.goto(path);
    await this.waitNetworkKidLoadState();
  }

  async waitNetworkKidLoadState() {
    await this.page.waitForLoadState("networkidle");
  }

  async waitForDomContentLoad() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async waitForLoadState() {
    await this.page.waitForLoadState(`load`);
  }

  async reloadPage() {
    await this.page.reload();
    await this.waitForDomContentLoad();
  }
}

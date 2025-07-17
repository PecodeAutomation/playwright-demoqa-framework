import { Page } from "@playwright/test";
import { HeaderComponent } from "../components/common/HeaderComponent";
import { RightSideAdvertisementComponent } from "../components/common/AdvertisementComponent";
import { LeftPanelComponent } from "../components/common/LeftPanelComponent";

export class BasePage {
  constructor(protected readonly page: Page) {}

  readonly header = new HeaderComponent(this.page);
  readonly rightAd = new RightSideAdvertisementComponent(this.page);
  readonly leftPanel = new LeftPanelComponent(this.page);

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

  async verifyBaseComponents() {
    await this.header.verifyComponent();
    await this.rightAd.verifyComponent();
    await this.leftPanel.verifyComponent();
  }
}

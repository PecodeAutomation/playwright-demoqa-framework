import { TextBoxPage } from "../pages/elements/TextBoxPage";
import { Accordion } from "../components/navigation/Accordion";
import { Page } from "@playwright/test";
import { NavigationGroups } from "../types/navigation";
import { Elements } from "../types/elements";
import { CheckBoxPage } from "../pages/elements/CheckBoxPage";
import { RadioButtonPage } from "../pages/elements/RadioButtonPage";
import { WebTablesPage } from "../pages/elements/WebTablesPage";
import { ButtonsPage } from "../pages/elements/ButtonsPage";
import { LinksPage } from "../pages/elements/LinksPage";
import { BrokenLinksImagesPage } from "../pages/elements/BrokenLinksImagesPage";
import { UploadDownloadPage } from "../pages/elements/UploadDownloadPage";
import { DynamicPropertiesPage } from "../pages/elements/DynamicPropertiesPage";

export class ElementsNavigationService {
  constructor(private page: Page) {}

  async openTextBox(): Promise<TextBoxPage> {
    await this.page.goto("");
    const elementsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ELEMENTS
    );
    await elementsGroup.navigateTo(Elements.TEXT_BOX);
    return new TextBoxPage(this.page);
  }

  async openCheckBox(): Promise<CheckBoxPage> {
    await this.page.goto("");
    const elementsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ELEMENTS
    );
    await elementsGroup.navigateTo(Elements.CHECK_BOX);
    return new CheckBoxPage(this.page);
  }

  async openRadioButton(): Promise<RadioButtonPage> {
    await this.page.goto("");
    const elementsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ELEMENTS
    );
    await elementsGroup.navigateTo(Elements.RADIO_BUTTON);
    return new RadioButtonPage(this.page);
  }

  async openWebTables(): Promise<WebTablesPage> {
    await this.page.goto("");
    const elementsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ELEMENTS
    );
    await elementsGroup.navigateTo(Elements.WEB_TABLES);
    return new WebTablesPage(this.page);
  }

  async openButtons(): Promise<ButtonsPage> {
    await this.page.goto("");
    const elementsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ELEMENTS
    );
    await elementsGroup.navigateTo(Elements.BUTTONS);
    return new ButtonsPage(this.page);
  }

  async openLinks(): Promise<LinksPage> {
    await this.page.goto("");
    const elementsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ELEMENTS
    );
    await elementsGroup.navigateTo(Elements.LINKS);
    return new LinksPage(this.page);
  }

  async openBrokenLinksImages(): Promise<BrokenLinksImagesPage> {
    await this.page.goto("");
    const elementsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ELEMENTS
    );
    await elementsGroup.navigateTo(Elements.BROKEN_LINKS_IMAGES);
    return new BrokenLinksImagesPage(this.page);
  }

  async openUploadDownloadPage(): Promise<UploadDownloadPage> {
    await this.page.goto("");
    const elementsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ELEMENTS
    );
    await elementsGroup.navigateTo(Elements.UPLOAD_AND_DOWNLOAD);
    return new UploadDownloadPage(this.page);
  }

  async openDynamicPropertiesPage(): Promise<DynamicPropertiesPage> {
    await this.page.goto("");
    const elementsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.ELEMENTS
    );
    await elementsGroup.navigateTo(Elements.DYNAMIC_PROPERTIES);
    return new DynamicPropertiesPage(this.page);
  }
}

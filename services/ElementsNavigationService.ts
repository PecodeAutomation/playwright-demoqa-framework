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
}

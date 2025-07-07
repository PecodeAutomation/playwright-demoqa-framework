import { TextBoxPage } from "../pages/elements/TextBoxPage";
import { Accordion } from "../components/navigation/Accordion";
import { Page } from "@playwright/test";
import { NavigationGroups } from "../types/navigation";
import { Elements } from "../types/elements";
import { CheckBoxPage } from "../pages/elements/CheckBoxPage";
import { RadioButtonPage } from "../pages/elements/RadioButtonPage";

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
}

import { test as base } from "@playwright/test";
import { TextBoxPage } from "../pages/elements/TextBoxPage";
import { CheckBoxPage } from "../pages/elements/CheckBoxPage";
import { RadioButtonPage } from "../pages/elements/RadioButtonPage";
import { ElementsNavigationService } from "../services/ElementsNavigationService";


export type PageFixtures = {
  elementsNavigationService: ElementsNavigationService;
  textBoxPage: TextBoxPage;
  checkBoxPage: CheckBoxPage;
  radioButtonPage: RadioButtonPage;
};

export const test = base.extend<PageFixtures>({
  elementsNavigationService: async ({ page }, use) => {
    const service = new ElementsNavigationService(page);
    await use(service);
  },

  textBoxPage: async ({ elementsNavigationService }, use) => {
    const textBoxPage = await elementsNavigationService.openTextBox();
    await use(textBoxPage);
  },

  checkBoxPage: async ({ elementsNavigationService }, use) => {
    const checkBoxPage = await elementsNavigationService.openCheckBox();
    await use(checkBoxPage);
  },

  radioButtonPage: async ({ elementsNavigationService }, use) => {
    const radioButtonPage = await elementsNavigationService.openRadioButton();
    await use(radioButtonPage);
  },
});

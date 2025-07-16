import { test as base } from "@playwright/test";
import { TextBoxPage } from "../pages/elements/TextBoxPage";
import { CheckBoxPage } from "../pages/elements/CheckBoxPage";
import { RadioButtonPage } from "../pages/elements/RadioButtonPage";
import { ElementsNavigationService } from "../services/ElementsNavigationService";
import { WebTablesPage } from "../pages/elements/WebTablesPage";
import { ButtonsPage } from "../pages/elements/ButtonsPage";
import { LinksPage } from "../pages/elements/LinksPage";
import { BrokenLinksImagesPage } from "../pages/elements/BrokenLinksImagesPage";
import { UploadDownloadPage } from "../pages/elements/UploadDownloadPage";
import { DynamicPropertiesPage } from "../pages/elements/DynamicPropertiesPage";

export type PageFixtures = {
  elementsNavigationService: ElementsNavigationService;
  textBoxPage: TextBoxPage;
  checkBoxPage: CheckBoxPage;
  radioButtonPage: RadioButtonPage;
  webTablesPage: WebTablesPage;
  buttonsPage: ButtonsPage;
  linksPage: LinksPage;
  brokenLinksImagesPage: BrokenLinksImagesPage;
  uploadDownloadPage: UploadDownloadPage;
  dynamicPropertiesPage: DynamicPropertiesPage;
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

  webTablesPage: async ({ elementsNavigationService }, use) => {
    const webTablesPage = await elementsNavigationService.openWebTables();
    await use(webTablesPage);
  },

  buttonsPage: async ({ elementsNavigationService }, use) => {
    const buttonsPage = await elementsNavigationService.openButtons();
    await use(buttonsPage);
  },

  linksPage: async ({ elementsNavigationService }, use) => {
    const linksPage = await elementsNavigationService.openLinks();
    await use(linksPage);
  },

  brokenLinksImagesPage: async ({ elementsNavigationService }, use) => {
    const brokenLinksImagesPage =
      await elementsNavigationService.openBrokenLinksImages();
    await use(brokenLinksImagesPage);
  },

  uploadDownloadPage: async ({ elementsNavigationService }, use) => {
    const uploadDownloadPage =
      await elementsNavigationService.openUploadDownloadPage();
    await use(uploadDownloadPage);
  },

  dynamicPropertiesPage: async ({ elementsNavigationService }, use) => {
    const dynamicPropertiesPage =
      await elementsNavigationService.openDynamicPropertiesPage();
    await use(dynamicPropertiesPage);
  },
});

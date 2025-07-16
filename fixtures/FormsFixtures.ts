import { test as base } from "@playwright/test";
import { FormsNavigationService } from "../services/FormsNavigationService";
import { PracticeFormPage } from "../pages/forms/PracticeFormPage";

export type PageFixtures = {
  formsNavigationService: FormsNavigationService;
  practiceFormPage: PracticeFormPage;
};

export const test = base.extend<PageFixtures>({
  formsNavigationService: async ({ page }, use) => {
    const service = new FormsNavigationService(page);
    await use(service);
  },

  practiceFormPage: async ({ formsNavigationService }, use) => {
    const practiceFormPage = await formsNavigationService.openPracticeForm();
    await use(practiceFormPage);
  },
});

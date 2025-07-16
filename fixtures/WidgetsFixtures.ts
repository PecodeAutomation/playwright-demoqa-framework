import { test as base } from "@playwright/test";
import { WidgetsNavigationService } from "../services/WidgetsNavigationService";
import { AccordianPage } from "../pages/widgets/AccordianPage";
import { AutoCompletePage } from "../pages/widgets/AutoCompletePage";

export type PageFixtures = {
  widgetsNavigationService: WidgetsNavigationService;
  accordianPage: AccordianPage;
  autoCompletePage: AutoCompletePage;
};

export const test = base.extend<PageFixtures>({
  widgetsNavigationService: async ({ page }, use) => {
    const service = new WidgetsNavigationService(page);
    await use(service);
  },

  accordianPage: async ({ widgetsNavigationService }, use) => {
    const accordianPage = await widgetsNavigationService.openAccordian();
    await use(accordianPage);
  },

  autoCompletePage: async ({ widgetsNavigationService }, use) => {
    const autoCompletePage = await widgetsNavigationService.openAutoComplete();
    await use(autoCompletePage);
  },
});
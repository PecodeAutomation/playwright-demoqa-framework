import { test as base } from "@playwright/test";
import { WidgetsNavigationService } from "../services/WidgetsNavigationService";
import { AccordianPage } from "../pages/widgets/AccordianPage";
import { AutoCompletePage } from "../pages/widgets/AutoCompletePage";
import { DatePickerPage } from "../pages/widgets/DatePickerPage";
import { SliderPage } from "../pages/widgets/SliderPage";
import { ProgressBarPage } from "../pages/widgets/ProgressBarPage";

export type PageFixtures = {
  widgetsNavigationService: WidgetsNavigationService;
  accordianPage: AccordianPage;
  autoCompletePage: AutoCompletePage;
  datePickerPage: DatePickerPage;
  sliderPage: SliderPage;
  progressBarPage: ProgressBarPage;
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

  datePickerPage: async ({ widgetsNavigationService }, use) => {
    const datePickerPage = await widgetsNavigationService.openDatePicker();
    await use(datePickerPage);
  },

  sliderPage: async ({ widgetsNavigationService }, use) => {
    const sliderPage = await widgetsNavigationService.openSlider();
    await use(sliderPage);
  },

  progressBarPage: async ({ widgetsNavigationService }, use) => {
    const progressBarPage = await widgetsNavigationService.openProgressBar();
    await use(progressBarPage);
  },
});
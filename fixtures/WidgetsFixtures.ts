import { test as base } from "@playwright/test";
import { WidgetsNavigationService } from "../services/WidgetsNavigationService";
import { AccordianPage } from "../pages/widgets/AccordianPage";
import { AutoCompletePage } from "../pages/widgets/AutoCompletePage";
import { DatePickerPage } from "../pages/widgets/DatePickerPage";
import { SliderPage } from "../pages/widgets/SliderPage";
import { ProgressBarPage } from "../pages/widgets/ProgressBarPage";
import { TabsPage } from "../pages/widgets/TabsPage";
import { ToolTipsPage } from "../pages/widgets/ToolTipsPage";
import { MenuPage } from "../pages/widgets/MenuPage";
import { SelectMenuPage } from "../pages/widgets/SelectMenuPage";

export type PageFixtures = {
  widgetsNavigationService: WidgetsNavigationService;
  accordianPage: AccordianPage;
  autoCompletePage: AutoCompletePage;
  datePickerPage: DatePickerPage;
  sliderPage: SliderPage;
  progressBarPage: ProgressBarPage;
  tabsPage: TabsPage;
  toolTipsPage: ToolTipsPage;
  menuPage: MenuPage;
  selectMenuPage: SelectMenuPage;
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

  tabsPage: async ({ widgetsNavigationService }, use) => {
    const tabsPage = await widgetsNavigationService.openTabs();
    await use(tabsPage);
  },

  toolTipsPage: async ({ widgetsNavigationService }, use) => {
    const toolTipsPage = await widgetsNavigationService.openToolTips();
    await use(toolTipsPage);
  },

  menuPage: async ({ widgetsNavigationService }, use) => {
    const menuPage = await widgetsNavigationService.openMenu();
    await use(menuPage);
  },

  selectMenuPage: async ({ widgetsNavigationService }, use) => {
    const selectMenuPage = await widgetsNavigationService.openSelectMenu();
    await use(selectMenuPage);
  },
});

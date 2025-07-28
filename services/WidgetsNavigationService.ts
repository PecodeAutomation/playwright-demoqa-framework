import { Accordion } from "../components/navigation/Accordion";
import { Page } from "@playwright/test";
import { NavigationGroups } from "../types/navigation";
import { Widgets } from "../types/widgets";
import { AccordianPage } from "../pages/widgets/AccordianPage";
import { AutoCompletePage } from "../pages/widgets/AutoCompletePage";
import { DatePickerPage } from "../pages/widgets/DatePickerPage";
import { SliderPage } from "../pages/widgets/SliderPage";
import { ProgressBarPage } from "../pages/widgets/ProgressBarPage";
import { TabsPage } from "../pages/widgets/TabsPage";
import { ToolTipsPage } from "../pages/widgets/ToolTipsPage";
import { MenuPage } from "../pages/widgets/MenuPage";
import { SelectMenuPage } from "../pages/widgets/SelectMenuPage";

export class WidgetsNavigationService {
  constructor(private page: Page) {}

  async openAccordian(): Promise<AccordianPage> {
    await this.page.goto("");
    const widgetsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.WIDGETS
    );
    await widgetsGroup.navigateTo(Widgets.ACCORDIAN);
    return new AccordianPage(this.page);
  }

  async openAutoComplete(): Promise<AutoCompletePage> {
    await this.page.goto("");
    const widgetsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.WIDGETS
    );
    await widgetsGroup.navigateTo(Widgets.AUTO_COMPLETE);
    return new AutoCompletePage(this.page);
  }

  async openDatePicker(): Promise<DatePickerPage> {
    await this.page.goto("");
    const widgetsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.WIDGETS
    );
    await widgetsGroup.navigateTo(Widgets.DATE_PICKER);
    return new DatePickerPage(this.page);
  }

  async openSlider(): Promise<SliderPage> {
    await this.page.goto("");
    const widgetsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.WIDGETS
    );
    await widgetsGroup.navigateTo(Widgets.SLIDER);
    return new SliderPage(this.page);
  }

  async openProgressBar(): Promise<ProgressBarPage> {
    await this.page.goto("");
    const widgetsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.WIDGETS
    );
    await widgetsGroup.navigateTo(Widgets.PROGRESS_BAR);
    return new ProgressBarPage(this.page);
  }

  async openTabs(): Promise<TabsPage> {
    await this.page.goto("");
    const widgetsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.WIDGETS
    );
    await widgetsGroup.navigateTo(Widgets.TABS);
    return new TabsPage(this.page);
  }

  async openToolTips(): Promise<ToolTipsPage> {
    await this.page.goto("");
    const widgetsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.WIDGETS
    );
    await widgetsGroup.navigateTo(Widgets.TOOL_TIPS);
    return new ToolTipsPage(this.page);
  }

  async openMenu(): Promise<MenuPage> {
    await this.page.goto("");
    const widgetsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.WIDGETS
    );
    await widgetsGroup.navigateTo(Widgets.MENU);
    return new MenuPage(this.page);
  }

  async openSelectMenu(): Promise<SelectMenuPage> {
    await this.page.goto("");
    const widgetsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.WIDGETS
    );
    await widgetsGroup.navigateTo(Widgets.SELECT_MENU);
    return new SelectMenuPage(this.page);
  }
}
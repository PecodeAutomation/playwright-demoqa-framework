import { Accordion } from "../components/navigation/Accordion";
import { Page } from "@playwright/test";
import { NavigationGroups } from "../types/navigation";
import { Widgets } from "../types/widgets";
import { AccordianPage } from "../pages/widgets/AccordianPage";
import { AutoCompletePage } from "../pages/widgets/AutoCompletePage";
import { DatePickerPage } from "../pages/widgets/DatePickerPage";
import { SliderPage } from "../pages/widgets/SliderPage";
import { ProgressBarPage } from "../pages/widgets/ProgressBarPage";

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
}
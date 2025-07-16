import { Accordion } from "../components/navigation/Accordion";
import { Page } from "@playwright/test";
import { NavigationGroups } from "../types/navigation";
import { Widgets } from "../types/widgets";
import { AccordianPage } from "../pages/widgets/AccordianPage";
import { AutoCompletePage } from "../pages/widgets/AutoCompletePage";

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
}
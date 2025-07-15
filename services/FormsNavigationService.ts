import { Accordion } from "../components/navigation/Accordion";
import { Page } from "@playwright/test";
import { NavigationGroups } from "../types/navigation";
import { PracticeFormPage } from "../pages/forms/PracticeFormPage";
import { Forms } from "../types/forms";

export class FormsNavigationService {
  constructor(private page: Page) {}

  async openPracticeForm(): Promise<PracticeFormPage> {
    await this.page.goto("");
    const formsGroup = new Accordion(this.page).getGroup(
      NavigationGroups.FORMS
    );
    await formsGroup.navigateTo(Forms.PRACTICE_FORM);
    return new PracticeFormPage(this.page);
  }
}
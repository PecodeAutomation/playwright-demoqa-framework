import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class AccordianPage extends BasePage {
  private readonly firstSectionHeader: Locator;
  private readonly firstSectionContent: Locator;
  private readonly secondSectionHeader: Locator;
  private readonly secondSectionContent: Locator;
  private readonly thirdSectionHeader: Locator;
  private readonly thirdSectionContent: Locator;

  constructor(page: Page) {
    super(page);
    this.firstSectionHeader = page.locator("#section1Heading");
    this.firstSectionContent = page.locator("#section1Content");
    this.secondSectionHeader = page.locator("#section2Heading");
    this.secondSectionContent = page.locator("#section2Content");
    this.thirdSectionHeader = page.locator("#section3Heading");
    this.thirdSectionContent = page.locator("#section3Content");
  }

  async verifyInitialState() {
    await expect(this.firstSectionContent).toBeVisible();
    await expect(this.secondSectionContent).not.toBeVisible();
    await expect(this.thirdSectionContent).not.toBeVisible();
  }

  async toggleSection(sectionNumber: number) {
    switch (sectionNumber) {
      case 1:
        await this.firstSectionHeader.click();
        break;
      case 2:
        await this.secondSectionHeader.click();
        break;
      case 3:
        await this.thirdSectionHeader.click();
        break;
      default:
        throw new Error(`Invalid section number: ${sectionNumber}`);
    }
  }

  async verifySectionState(sectionNumber: number, expectedVisibility: boolean) {
    const content = this.getSectionContent(sectionNumber);
    
    if (expectedVisibility) {
      await expect(content).toBeVisible();
    } else {
      await expect(content).not.toBeVisible();
    }
  }

  async verifySectionContent(sectionNumber: number, expectedText: string) {
    const content = this.getSectionContent(sectionNumber);
    await expect(content).toContainText(expectedText);
  }

  private getSectionContent(sectionNumber: number): Locator {
    switch (sectionNumber) {
      case 1: return this.firstSectionContent;
      case 2: return this.secondSectionContent;
      case 3: return this.thirdSectionContent;
      default: throw new Error(`Invalid section number: ${sectionNumber}`);
    }
  }
}
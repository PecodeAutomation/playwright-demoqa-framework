import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class DatePickerPage extends BasePage {
  private readonly selectDateInput: Locator;
  private readonly dateAndTimeInput: Locator;
  private readonly monthDropdown: Locator;
  private readonly yearDropdown: Locator;
  private readonly timePicker: Locator;

  constructor(page: Page) {
    super(page);
    this.selectDateInput = page.locator("#datePickerMonthYearInput");
    this.dateAndTimeInput = page.locator("#dateAndTimePickerInput");
    this.monthDropdown = page.locator(".react-datepicker__month-select");
    this.yearDropdown = page.locator(".react-datepicker__year-select");
    this.timePicker = page.locator(".react-datepicker__time-list");
  }

  async selectSimpleDate(day: number, month: string, year: string) {
    await this.selectDateInput.click();
    await this.monthDropdown.selectOption(month);
    await this.yearDropdown.selectOption(year);

    const dayLocator = this.page.locator(
      `.react-datepicker__day:not(.react-datepicker__day--outside-month):text("${day}")`
    );
    await dayLocator.click();
  }

  async selectDateOnly(dateTime: string) {
    await this.dateAndTimeInput.click();
    await this.dateAndTimeInput.fill(dateTime);
    await this.page.waitForTimeout(500);
  }

  async selectDateTimeWithTime(dateTime: string, hours: number, minutes: number) {
    await this.dateAndTimeInput.click();
    await this.dateAndTimeInput.fill(dateTime);
    await this.selectTime(hours, minutes);
}

  async verifySimpleDate(expectedDate: string) {
    await expect(this.selectDateInput).toHaveValue(expectedDate);
  }

  async verifyDateTime(expectedDateTime: string) {
    await expect(this.dateAndTimeInput).toHaveValue(expectedDateTime);
  }

  async selectTime(hours: number, minutes: number) {
    await this.dateAndTimeInput.click();
    
    const roundedMinutes = Math.round(minutes / 15) * 15;
    const adjustedHours = roundedMinutes === 60 ? hours + 1 : hours;
    const finalMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;
    
    const timeString = `${adjustedHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
    const timeOption = this.timePicker.locator(`li:has-text("${timeString}")`);
    
    await timeOption.click();
    await this.page.waitForSelector(".react-datepicker", { state: "detached" });
}
}

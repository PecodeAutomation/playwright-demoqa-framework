import { test } from "../../fixtures/WidgetsFixtures";
import { MONTHS } from "../../constants/datePicker";
import { getFormattedDate, roundTimeToNearest } from "../../utils/dateHelper";

test.describe("Widgets - Date Picker page", () => {
  test("Verify today's date selection", async ({ datePickerPage }) => {
    const today = new Date();
    const day = today.getDate();
    const month = MONTHS[today.getMonth()];
    const year = today.getFullYear().toString();
    const expectedDate = getFormattedDate(today, "simple");

    await datePickerPage.verifyBaseComponents();
    await datePickerPage.selectSimpleDate(day, month, year);
    await datePickerPage.verifySimpleDate(expectedDate);
  });

  test("Verify future date selection", async ({ datePickerPage }) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const day = futureDate.getDate();
    const month = MONTHS[futureDate.getMonth()];
    const year = futureDate.getFullYear().toString();
    const expectedDate = getFormattedDate(futureDate, "simple");

    await datePickerPage.verifyBaseComponents();
    await datePickerPage.selectSimpleDate(day, month, year);
    await datePickerPage.verifySimpleDate(expectedDate);
  });

  test("Verify current datetime selection", async ({ datePickerPage }) => {
    const now = new Date();
    const datePart = `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const expectedTime = roundTimeToNearest(now);
    const expectedDateTime = `${datePart} ${expectedTime}`;

    await datePickerPage.verifyBaseComponents();
    await datePickerPage.selectDateTimeWithTime(
      datePart,
      now.getHours(),
      now.getMinutes()
    );
    await datePickerPage.verifyDateTime(expectedDateTime);
  });

  test("Verify future datetime selection", async ({ datePickerPage }) => {
    const futureTime = new Date();
    futureTime.setHours(futureTime.getHours() + 2);

    const datePart = `${MONTHS[futureTime.getMonth()]} ${futureTime.getDate()}, ${futureTime.getFullYear()}`;
    const roundedTime = roundTimeToNearest(futureTime);
    const expectedDateTime = `${datePart} ${roundedTime}`;

    await datePickerPage.verifyBaseComponents();
    await datePickerPage.selectDateTimeWithTime(
      datePart,
      futureTime.getHours(),
      futureTime.getMinutes()
    );
    await datePickerPage.verifyDateTime(expectedDateTime);
  });

  test("Verify past datetime selection", async ({ datePickerPage }) => {
    const pastTime = new Date();
    pastTime.setHours(pastTime.getHours() - 2);

    const datePart = `${MONTHS[pastTime.getMonth()]} ${pastTime.getDate()}, ${pastTime.getFullYear()}`;
    const roundedTime = roundTimeToNearest(pastTime);
    const expectedDateTime = `${datePart} ${roundedTime}`;

    await datePickerPage.verifyBaseComponents();
    await datePickerPage.selectDateTimeWithTime(
      datePart,
      pastTime.getHours(),
      pastTime.getMinutes()
    );
    await datePickerPage.verifyDateTime(expectedDateTime);
  });
});

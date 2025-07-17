import { MONTHS } from "../constants/datePicker";

export function roundTimeToNearest(date: Date): string {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const roundedMinutes = Math.round(minutes / 15) * 15;
  let adjustedHours = hours;
  let finalMinutes = roundedMinutes;

  if (roundedMinutes === 60) {
    adjustedHours += 1;
    finalMinutes = 0;
  }

  const ampm = adjustedHours >= 12 ? "PM" : "AM";
  const twelveHourFormat = adjustedHours % 12 || 12;

  return `${twelveHourFormat}:${finalMinutes.toString().padStart(2, "0")} ${ampm}`;
}

export const getFormattedDate = (date: Date, format: "simple" | "withTime") => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const twelveHourFormat = hours % 12 || 12;

  if (format === "simple") {
    return `${(month + 1).toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;
  } else {
    return `${MONTHS[month]} ${day}, ${year} ${twelveHourFormat}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }
};

import { format } from "date-fns";

export const formatDate = (
  input: Date | string | number,
  dateFormat = "dd.MM.yyyy"
): string => {
  try {
    const date = new Date(input);
    if (isNaN(date.getTime())) return "";

    return format(date, dateFormat);
  } catch {
    return "";
  }
};

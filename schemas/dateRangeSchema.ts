import * as zod from "zod";

export const DateRangeSchema = zod.object({
  dateRange: zod
    .object({
      from: zod.date({ required_error: "Required field" }),
      to: zod.date({ required_error: "Required field" }),
    })
    .nullable(),
});

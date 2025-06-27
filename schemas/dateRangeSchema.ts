import * as zod from "zod";

export const DateRangeSchema = zod.object({
  dateRange: zod.object({
    from: zod.date(),
    to: zod.date(),
  }),
});

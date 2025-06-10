import * as zod from "zod";

export const FiltersSchema = zod.object({
  columns: zod.record(zod.boolean()).optional(),
});

import * as zod from "zod";

export const TableColumnsSchema = zod.object({
  columns: zod.record(zod.boolean()).optional(),
});

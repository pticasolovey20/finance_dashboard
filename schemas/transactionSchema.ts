import * as zod from "zod";

export const TransactionSchema = zod.object({
  id: zod.string({ required_error: "Required field" }),
});

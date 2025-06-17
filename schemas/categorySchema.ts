import * as zod from "zod";

export const CategorySchema = zod.object({
  categoryId: zod.string({ required_error: "Required field" }),
  type: zod.string({ required_error: "Required field" }),
  color: zod.string({ required_error: "Required field" }),
});

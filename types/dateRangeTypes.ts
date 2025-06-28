import * as zod from "zod";

import { DateRangeSchema } from "@/schemas/dateRangeSchema";

export type DateRangeFormFields = zod.infer<typeof DateRangeSchema>;

export type DateRangeData = {
  from: Date;
  to: Date;
} | null;

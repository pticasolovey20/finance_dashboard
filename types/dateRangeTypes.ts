import * as zod from "zod";

import { DateRangeSchema } from "@/schemas/dateRangeSchema";

export type DaterangeFormFields = zod.infer<typeof DateRangeSchema>;

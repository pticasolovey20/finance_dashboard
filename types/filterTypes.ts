import * as zod from "zod";

import { FiltersSchema } from "@/schemas/filterSchema";

export type FiltersFormFields = zod.infer<typeof FiltersSchema>;

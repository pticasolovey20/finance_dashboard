import * as zod from "zod";
import { FiltersSchema } from "@/schemas/filtersSchema";

export type FiltersFormFields = zod.infer<typeof FiltersSchema>;

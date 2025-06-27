import * as zod from "zod";

import { TableColumnsSchema } from "@/schemas/tableColumnsSchema";

export type TableColumnsFormFields = zod.infer<typeof TableColumnsSchema>;

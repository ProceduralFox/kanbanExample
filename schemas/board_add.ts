import { z } from "zod";
import { columnAddSchema } from "./column_add";



export const boardAddSchema = z.object({
  name: z.string(),
  columns: z.array(columnAddSchema),
  id: z.string()
})

export type BoardAddType = z.infer<typeof boardAddSchema>

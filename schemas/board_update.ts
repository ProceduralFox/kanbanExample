import { z } from "zod";


export const boardUpdateColumn = z.object({
  board_id: z.string(),
  name: z.string(),
  id: z.string().optional(),
  toDelete: z.boolean().optional()
})

export const boardUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  columns: z.array(boardUpdateColumn)
})

type test = z.infer<typeof boardUpdateSchema>
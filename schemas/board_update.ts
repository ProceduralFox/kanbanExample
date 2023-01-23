import { z } from "zod";


export const boardUpdateColumn = z.object({
  board_id: z.string(),
  name: z.string(),
  id: z.string(),
  toDelete: z.boolean().optional()
})

export const boardUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  columns: z.array(boardUpdateColumn)
})

export type BoardUpdateType = z.infer<typeof boardUpdateSchema>
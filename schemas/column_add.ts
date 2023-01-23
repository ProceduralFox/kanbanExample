import z from 'zod';

export const columnAddSchema = z.object({
  name: z.string(),
  board_id: z.string(),
  id: z.string()
})

export type ColumnAddSchemaType = z.infer<typeof columnAddSchema>
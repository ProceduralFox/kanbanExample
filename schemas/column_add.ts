import z from 'zod';

export const columnAddSchema = z.object({
  name: z.string(),
  board_id: z.string()
})
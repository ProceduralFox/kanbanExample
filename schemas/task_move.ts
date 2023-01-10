import z from 'zod';

export const taskMoveSchema = z.object({
  task_id: z.string(),
  new_column_id: z.string()
})
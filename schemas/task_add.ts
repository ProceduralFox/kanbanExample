import z from 'zod';

export const taskAddSchema = z.object({
  task: z.object({
    column_id: z.string(),
    name: z.string(),
    description: z.string(),
    board_id: z.string(),
    id: z.string()
  }),
  subtasks: z.array(z.object({
    name: z.string(),
  })).optional()

})
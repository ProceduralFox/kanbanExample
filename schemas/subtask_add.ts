import z from 'zod';

export const subtaskAddSchema = z.object({
  task_id: z.string(),
  name: z.string(),
})
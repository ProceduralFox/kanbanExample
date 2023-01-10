import z from 'zod';

export const subtaskCompleteSchema = z.object({
  completed: z.boolean()
})
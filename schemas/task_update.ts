import { z } from "zod";


export const taskUpdateSubtasks = z.object({
  id: z.string(),
  task_id: z.string(),
  name: z.string(),
  completed: z.boolean(),
  toDelete: z.boolean().optional()
})

export const taskUpdateSchema = z.object({
  task: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    column_id: z.string(),
    board_id: z.string()
  }),
  subtasks: z.array(taskUpdateSubtasks)
})

export type TaskUpdateType = z.infer<typeof taskUpdateSchema>

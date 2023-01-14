// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { taskMoveSchema } from '../../../schemas/task_move'
import z from 'zod'
import { taskAddSchema } from '../../../schemas/task_add'
import { Database } from '../../../types/supabase'

type Data = any


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const supabase = createServerSupabaseClient<Database>({ req, res })

    taskAddSchema.parse(req.body)

    const body: z.infer<typeof taskAddSchema> = req.body

    const { data: taskData, error: taskError } = await supabase
    .from('tasks')
    .insert(body.task)
    .select()

    if(taskError) return res.status(400).json(taskError)

    if(taskData && body.subtasks){
      const id = taskData[0].id

      const subtasksToInsert: Database["public"]["Tables"]["subtasks"]["Insert"][] = body.subtasks?.map((subtask)=>{
        return {
          completed: false,
          task_id: id,
          name: subtask.name,
        }
      })

      const { data: subtaskData, error: subtaskError } = await supabase
      .from('subtasks')
      .insert(subtasksToInsert)
      .select()

      if(subtaskError) return res.status(400).json(subtaskError)

      return res.status(200).json({task: taskData, subtasks: subtaskData})
    }

    return res.status(200).json({task: taskData, subtasks: "none to create"})
  } catch (error) {
    return res.status(400).json(error)
  }

}

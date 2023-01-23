// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { taskMoveSchema } from '../../../schemas/task_move'
import z from 'zod'
import { taskAddSchema } from '../../../schemas/task_add'
import { Database } from '../../../types/supabase'
import { taskUpdateSchema } from '../../../schemas/task_update'

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const supabase = createServerSupabaseClient<Database>({ req, res })

    taskAddSchema.parse(req.body)

    const body: z.infer<typeof taskUpdateSchema> = req.body

    const { data: taskData, error: taskError } = await supabase
    .from('tasks')
    .insert(body.task)
    .select('id')

    if(taskError) return res.status(400).json(taskError)

    console.log(body, "####################################")
    if(taskData && body.subtasks){

      const subtasksToInsert: Database["public"]["Tables"]["subtasks"]["Insert"][] = []

      body.subtasks.forEach((subtask)=>{
        if(subtask.toDelete) return
        subtasksToInsert.push(subtask)
      })

      console.log(subtasksToInsert, "###############")

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

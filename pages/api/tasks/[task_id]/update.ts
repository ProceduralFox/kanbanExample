// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../../types/supabase'
import { z } from 'zod'
import { taskUpdateSchema, taskUpdateSubtasks } from '../../../../schemas/task_update'



type Data = any

type ColumnUpdate = Database["public"]["Tables"]["board_columns"]["Insert"] & {toDelete: boolean}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const supabase = createServerSupabaseClient<Database>({ req, res })

  try {
    taskUpdateSchema.parse(req.body)

    const body: z.infer<typeof taskUpdateSchema> = req.body

    const toDelete: string[] = []
    const toUpsert: z.infer<typeof taskUpdateSubtasks>[] = []

    body.subtasks.forEach((subtask)=>{
      if(subtask.toDelete){
        if(subtask.id) toDelete.push(subtask.id)
      } else {
        delete subtask.toDelete
        toUpsert.push(subtask)
      }
    })

    // cascade setup on db level
    let { error: delError } = await supabase
    .from('subtasks')
    .delete()
    .in('id', toDelete)

    if(delError) res.status(400).json(delError)

    let { error: colsError } = await supabase
    .from('subtasks')
    .upsert(toUpsert)

    if(colsError) res.status(400).json(colsError)

    let { data, error: boardsError } = await supabase
    .from('tasks')
    .update(body.task)
    .eq('id', req.query.board_id)

    if(boardsError) res.status(400).json(boardsError)


    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }

}

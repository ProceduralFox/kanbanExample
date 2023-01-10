// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { taskMoveSchema } from '../../../../schemas/task_move'
import z from 'zod'

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const supabase = createServerSupabaseClient({ req, res })

    taskMoveSchema.parse(req.body)

    const body: z.infer<typeof taskMoveSchema> = req.body

    const { data, error } = await supabase
    .from('tasks')
    .update({ column_id: body.new_column_id })
    .eq('id', req.query.task_id)
  
    if(error) res.status(400).json(error)
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }

}

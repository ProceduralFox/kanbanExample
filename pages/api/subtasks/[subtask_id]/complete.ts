// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../../types/supabase'
import z from 'zod'
import { subtaskCompleteSchema } from '../../../../schemas/subtask_complete'


type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const supabase = createServerSupabaseClient<Database>({ req, res })

    subtaskCompleteSchema.parse(req.body)
  
    const body: z.infer<typeof subtaskCompleteSchema> = req.body
  
    const { data, error } = await supabase
    .from('subtasks')
    .update(body)
    .eq('id', req.query.subtask_id)
  
    if(error) res.status(400).json(error)
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }

}

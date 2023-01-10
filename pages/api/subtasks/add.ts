// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../types/supabase'
import { subtaskAddSchema } from '../../../schemas/subtask_add'
import z from 'zod'

type Data = any


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const supabase = createServerSupabaseClient<Database>({ req, res })

    subtaskAddSchema.parse(req.body)

    const body: z.infer<typeof subtaskAddSchema> = req.body

    const { data, error } = await supabase
    .from('subtasks')
    .insert({...body, completed: false})
  
    if(error) res.status(400).json(error)
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }

}

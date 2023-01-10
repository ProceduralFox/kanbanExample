// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { columnAddSchema } from '../../../schemas/column_add'
import z from 'zod'
import { Database } from '../../../types/supabase'

type Data = any


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const supabase = createServerSupabaseClient<Database>({ req, res })

    columnAddSchema.parse(req.body)

    const body: z.infer<typeof columnAddSchema>  = req.body

    const { data, error } = await supabase
    .from('board_columns')
    .insert([
      { ...body },
    ])
  
    if(error) res.status(400).json(error)
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
}

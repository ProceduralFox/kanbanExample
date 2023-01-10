// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { boardAddSchema } from '../../../schemas/board_add'
import z from 'zod'
import { Database } from '../../../types/supabase'

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  try {
    const supabase = createServerSupabaseClient<Database>({ req, res })

    boardAddSchema.parse(req.body)

    const body: z.infer<typeof boardAddSchema> = req.body

    const user = await supabase.auth.getUser()
  
    let { data, error } = await supabase
    .from('boards')
    .insert({...body, owner: user.data.user?.id})
    .eq('id', req.query.board_id)

    if(error) return res.status(400).json(error)
  
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }

}
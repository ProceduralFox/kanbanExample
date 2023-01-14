// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../../types/supabase'

type Data = any


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const supabase = createServerSupabaseClient<Database>({ req, res })

    let { data, error } = await supabase
    .from('boards')
    .delete()
    .eq('id', req.query.board_id)
  
    if(error) return res.status(400).json(error)
  
    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }

}
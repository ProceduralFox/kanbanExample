// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const supabase = createServerSupabaseClient({ req, res })

  const { data, error } = await supabase
  .from('board_columns')
  .insert([
    { ...req.body },
  ])

  console.log(error)
  if(error) res.status(400).json(error)
  res.status(200).json(data)
}

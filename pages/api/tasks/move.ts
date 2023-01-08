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
  .from('tasks')
  .update({ column_id: req.body.column_id })
  .eq('id', req.body.id)

  if(error) res.status(400).json(error)
  res.status(200).json(data)
}

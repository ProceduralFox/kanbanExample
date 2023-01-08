// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const supabase = createServerSupabaseClient({ req, res })

  // let { data: columns, error: colsError } = await supabase
  // .from('board_columns')
  // .select('*, columnTasks:tasks(*, taskSubtasks:subtasks(*))')
  // .eq('board_id', req.query.board_id)

  let { data, error } = await supabase
  .from('boards')
  .select('*, columns:board_columns(*,tasks:tasks(*, subtasks:subtasks(*)))')
  .eq('id', req.query.board_id)

  if(error) res.status(400).json(error)

  res.status(200).json(data)
}

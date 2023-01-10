// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../../types/supabase'
import { z } from 'zod'
import { boardUpdateColumn, boardUpdateSchema } from '../../../../schemas/board_update'

type Data = any

type ColumnUpdate = Database["public"]["Tables"]["board_columns"]["Insert"] & {toDelete: boolean}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const supabase = createServerSupabaseClient<Database>({ req, res })

  try {
    boardUpdateSchema.parse(req.body)

    const body: z.infer<typeof boardUpdateSchema> = req.body

    const toDelete: string[] = []
    const toUpsert: z.infer<typeof boardUpdateColumn>[] = []

    body.columns.forEach((col)=>{
      if(col.toDelete){
        if(col.id) toDelete.push(col.id)
      } else {
        delete col.toDelete
        toUpsert.push(col)
      }
    })

    // cascade setup on db level
    let { error: delError } = await supabase
    .from('board_columns')
    .delete()
    .in('id', toDelete)

    if(delError) res.status(400).json(delError)

    let { error: colsError } = await supabase
    .from('board_columns')
    .upsert(toUpsert)

    if(colsError) res.status(400).json(colsError)

    let { data, error: boardsError } = await supabase
    .from('boards')
    .update({name: body.name})
    .eq('id', req.query.board_id)

    if(boardsError) res.status(400).json(boardsError)


    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }

}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Database } from '../../../../types/supabase'
import { z } from 'zod'
import { boardUpdateColumn, boardUpdateSchema } from '../../../../schemas/board_update'
import { v4 as uuidv4 } from 'uuid';

type Data = any


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
        
        if(!col.id) col.id = uuidv4()
        toUpsert.push(col)
      }
    })

    // cascade setup on db level
    let { error: delError } = await supabase
    .from('board_columns')
    .delete()
    .in('id', toDelete)

    if(delError) return res.status(400).json({message: delError, operation: "columns delete"})

    
    let { error: colsError } = await supabase
    .from('board_columns')
    .upsert(toUpsert)

    if(colsError) return res.status(400).json({message: colsError, operation: "columns upsert"})

    let { data, error: boardsError } = await supabase
    .from('boards')
    .update({name: body.name})
    .eq('id', req.query.board_id)

    if(boardsError) return res.status(400).json({message: boardsError, operation: "boards update"})


    return res.status(200).json(data)
  } catch (error) {
    return res.status(400).json(error)
  }

}

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

    const { data: { user}} = await supabase.auth.getUser()
    
  
    let { data: boardData, error:boardError } = await supabase
    .from('boards')
    .insert({name: body.name, owner: user?user.id:null, id: body.id, isPublic: user ? false : true})
    .select()

    if(boardError) return res.status(400).json({message: boardError, operation: "board insert"})

    // const columns = body.columns.map((column)=>{
    //   return {column: column.name, board_id: body.id, id: column.i}
    // })
    
    let { data: colsData, error: colsError } = await supabase
    .from('board_columns')
    .insert(body.columns)

    if(colsError) return res.status(400).json({message: colsError, operation: "columns insert"})
  
    res.status(200).json(boardData)
  } catch (error) {
    res.status(400).json(error)
  }

}
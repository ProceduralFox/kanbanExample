// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { supabase } from '../../../supabase/config'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../types/supabase'
import { PostgrestError } from '@supabase/supabase-js';

type Data = Database["public"]["Tables"]["boards"]["Row"] | null | PostgrestError

// TODO TYPESCRIPT

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const supabase = createServerSupabaseClient<Database>({ req, res })
  
  let { data: example, error } = await supabase
  .from('boards')
  .select('name, id')

  if(error) return res.status(400).json(error)
  return res.status(200).json(example)
}


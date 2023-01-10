// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { supabase } from '../../../supabase/config'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../../types/supabase'
import { PostgrestError } from '@supabase/supabase-js';

type Data = Database["public"]["Tables"]["boards"]["Row"][] | null | PostgrestError


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const supabase = createServerSupabaseClient<Database>({ req, res })
  
  let { data: example, error } = await supabase
  .from('boards')
  .select('*')

  if(error) res.status(400).json(error)
  res.status(200).json(example)
}


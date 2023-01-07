// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // let { data: example, error } = await supabase
  // .from('example')
  // .select('*')

  // if(error) res.status(400).json(error)
  // res.status(200).json(example)
}

// const getBoards = async () => {

//   let { data: example, error } = await supabase
//   .from('example')
//   .select('id')


//   console.log(boards, error)

//   return boards
// }

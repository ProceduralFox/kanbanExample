import { supabase } from "../supabase/config"

import { Fetcher} from 'swr'

// export const fetcher = (...args:any) => {
//   fetch(...args).then(res => res.json())
// } 

export const fetcher = (url: string) => {
  
  // const options: any = {
  //   headers: new Headers({
  //     'Content-Type': 'application/json',
  //     access_token: token?token:"",
  //     refresh_token: refresh?refresh:"",
  //   }),
  //   credentials: 'same-origin',
  // }

  // console.log("session", url, "loggging from fetcher", token)
  // if (data) {
  //   options.method = 'POST'
  //   options.body = JSON.stringify(data)
  // }

  return fetch(url,).then((res) => {
    if (!res.ok) {
      // global error handling
    }
    return res.json()
  })
}
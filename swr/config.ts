export const fetcher = (url: string) => {
  

  return fetch(url).then((res) => {
    if (!res.ok) {
      const error = new Error('supabase error')
      throw error
    }
    return res.json()
  })
}
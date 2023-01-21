const truncateString = (string: string, maxLen: number, ending: string) => {
  const len = string.length

  if(len<=maxLen){
    return string
  }

  const preservedString = string.slice(0, maxLen)

  return preservedString + ending
}

export default truncateString
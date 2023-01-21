export type ClientUpdate<T = void> = {
  type: "mutate"
  mutateUrl: string,
  options:{[key:string]:any}
} | {
  type: "state"
  currentState: T
  setState: Function
}
export type ClientUpdate<T = undefined> = {
  type: "mutate"
  mutateUrl: string,
  currentState?: T
} | {
  type: "state"
  currentState: T
  setState: Function
}
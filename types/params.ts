export type ClientUpdate<T = void> = {
  type: "mutate"
  mutateUrl: string,
  currentState: T
} | {
  type: "state"
  currentState: T
  setState: Function
}
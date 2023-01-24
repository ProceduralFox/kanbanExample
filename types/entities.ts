export type FullBoard = {
  id:string,
  name: string,
  owner: string,
  columns: Column[]
}

export type Column = {
  board_id: string,
  id: string,
  name: string,
  tasks: Task[]
}

export type Task = {
  board_id: string,
  column_id: string,
  description: string,
  id: string,
  name: string,
  subtasks: Subtask[]
}

export type Subtask = {
  completed: boolean,
  id: string,
  name: string,
  task_id: string
}
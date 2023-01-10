export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      board_columns: {
        Row: {
          id: string
          board_id: string
          name: string | null
        }
        Insert: {
          id?: string
          board_id: string
          name?: string | null
        }
        Update: {
          id?: string
          board_id?: string
          name?: string | null
        }
      }
      boards: {
        Row: {
          id: string
          name: string | null
          owner: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          owner?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          owner?: string | null
        }
      }
      example: {
        Row: {
          id: number
          created_at: string | null
          name: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          name: string
        }
        Update: {
          id?: number
          created_at?: string | null
          name?: string
        }
      }
      subtasks: {
        Row: {
          id: string
          name: string
          completed: boolean
          task_id: string | null
        }
        Insert: {
          id?: string
          name?: string
          completed: boolean
          task_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          completed?: boolean
          task_id?: string | null
        }
      }
      tasks: {
        Row: {
          id: string
          board_id: string
          name: string
          description: string | null
          column_id: string
        }
        Insert: {
          id?: string
          board_id: string
          name?: string
          description?: string | null
          column_id: string
        }
        Update: {
          id?: string
          board_id?: string
          name?: string
          description?: string | null
          column_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

import type { EventsTable } from './entities/event'
import type { NewsTable } from './entities/news'

export interface Database {
  public: {
    Tables: {
        events: EventsTable
        news: NewsTable 
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

export type { Event } from './entities/event'
export type { News } from './entities/news'
export interface Event {
  id: string
  created_at: string
  title: string
  slug: string
  type: string
  category: string
  signup_link: string | null
  description: string | null
  image_url: string | null
  external_gallery_link: string | null
  location_id: number | null
  start_date: string
  end_date: string
}

export interface EventsTable {
  Row: Event
  Insert: Omit<Event, 'id' | 'created_at'> & {
    id?: string
    created_at?: string
  }
  Update: Partial<Omit<Event, 'id'>>
  Relationships: []
}

export type EventInsert = EventsTable['Insert']
export type EventUpdate = EventsTable['Update']


export enum EventType {
  TORNEO = 'torneo',
  ALLENAMENTO = 'allenamento',
  EVENTO = 'evento'
}
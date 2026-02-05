export interface Team {
  id: number
  created_at: string
  name: string
  category: string
  coach: string
  photo_url: string | null
  players: string[] 
}

export interface TeamsTable {
  Row: Team
  Insert: Omit<Team, 'id' | 'created_at'> & {
    id?: string
    created_at?: string
  }
  Update: Partial<Omit<Team, 'id' | 'created_at'>>
  Relationships: []
}

export type TeamInsert = TeamsTable['Insert']
export type TeamUpdate = TeamsTable['Update']
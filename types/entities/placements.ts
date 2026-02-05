export interface Placement {
  id: number
  created_at: string
  team_id: number
  day_number: number 
  rank: number     
}

export interface PlacementsTable {
  Row: Placement
  Insert: Omit<Placement, 'id' | 'created_at'> & {
    id?: string
    created_at?: string
  }
  Update: Partial<Omit<Placement, 'id' | 'created_at'>>
  Relationships: [
    {
      foreignKeyName: "placements_team_id_fkey"
      columns: ["team_id"]
      referencedRelation: "teams"
      referencedColumns: ["id"]
    }
  ]
}



export type PlacementInsert = PlacementsTable['Insert']
export type PlacementUpdate = PlacementsTable['Update']
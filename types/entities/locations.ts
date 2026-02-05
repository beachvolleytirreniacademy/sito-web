// ~/types/entities/locations.ts

export interface Locations {
  id: number
  created_at: string
  name: string
  address: string 
  map_link: string | null
  description: string | null 
  image_url: string | null     
  features: string[] | null    
}

export interface LocationsTable {
  Row: Location
  Insert: Omit<Location, 'id' | 'created_at'> & {
      id?: string
      created_at?: string
    }
  Update: Partial<Omit<Location, 'id' | 'created_at'>>
  Relationships: []
}

export type LocationInsert = LocationsTable['Insert']
export type LocationUpdate = LocationsTable['Update']
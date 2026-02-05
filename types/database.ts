import type { EventsTable } from './entities/event'
import type { NewsTable } from './entities/news'
import type { LocationsTable } from './entities/locations'
import type { ProductsTable } from './entities/products'
import type { TeamsTable } from './entities/teams'
import type { PlacementsTable } from './entities/placements'

export interface Database {
  public: {
    Tables: {
        events: EventsTable
        news: NewsTable 
        locations: LocationsTable
        products: ProductsTable
        teams: TeamsTable
        placements: PlacementsTable
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

export type { EventsTable } from './entities/event'
export type { NewsTable } from './entities/news'
export type { LocationsTable } from './entities/locations'
export type { ProductsTable } from './entities/products'
export type { TeamsTable } from './entities/teams'
export type { PlacementsTable } from './entities/placements'


export interface Partners {
  id: number
  name: string
  description: string | null
  imageURL: string | null
}

export interface PartnersTable {
  Row: Partners
  Insert: Omit<Partners, 'id'> & {
    id?: number
  }
  Update: Partial<Omit<Partners, 'id'>>
  Relationships: []
}

export type PartnerInsert = PartnersTable['Insert']
export type PartnerUpdate = PartnersTable['Update']
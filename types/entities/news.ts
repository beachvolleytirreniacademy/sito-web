export interface News {
  id: string
  created_at: string
  title: string
  date: string
  image: string | null
  body: string
}

export interface NewsTable {
  Row: News
  Insert: Omit<News, 'id' | 'created_at'> & {
    id?: string
    created_at?: string
  }
  Update: Partial<Omit<News, 'id' | 'created_at'>>
  Relationships: []
}

export type NewsInsert = NewsTable['Insert']
export type NewsUpdate = NewsTable['Update']
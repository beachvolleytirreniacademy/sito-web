export enum ProductType {
  ORDER = 'order',
  VINTED = 'vinted'
}

export interface Product {
  id: string
  created_at: string
  name: string
  description: string | null
  image: string | null
  type: ProductType 
  price: number
}

export interface ProductsTable {
  Row: Product
  Insert: Omit<Product, 'id' | 'created_at'> & {
    id?: string
    created_at?: string
    type: ProductType | string // "string" serve per compatibilità con i form HTML, ma l'IDE ti suggerirà l'Enum
  }
  Update: Partial<Omit<Product, 'id' | 'created_at'>>
  Relationships: []
}

export type ProductInsert = ProductsTable['Insert']
export type ProductUpdate = ProductsTable['Update']
import type { Product, ProductInsert, ProductUpdate } from '~/types/entities/products'
import { supabase } from './supabase'

export const ProductsClient = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    return data as Product[]
  },

  async getByType(type: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('type', type)
      .order('name', { ascending: true })
    
    if (error) throw error
    return data as Product[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Product
  },


  async create(product: ProductInsert) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()
    
    if (error) throw error
    return data as Product
  },


  async update(id: string, product: ProductUpdate) {
    const { data, error } = await supabase
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Product
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}
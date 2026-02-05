import type { News, NewsInsert, NewsUpdate } from '~/types/entities/news'
import { supabase } from './supabase'

export const NewsClient = {
  async getAll() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) throw error
    return data as News[]
  },

  async getPage(page: number, pageSize: number = 5) {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, count, error } = await supabase
      .from('news')
      .select('*', { count: 'exact' })
      .order('date', { ascending: false })
      .range(from, to)
    
    if (error) throw error
    return { 
      data: data as News[], 
      count: count || 0 
    }
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as News
  },

  async create(news: NewsInsert) {
    const { data, error } = await supabase
      .from('news')
      .insert(news)
      .select()
      .single()
    
    if (error) throw error
    return data as News
  },

  async update(id: string, news: NewsUpdate) {
    const { data, error } = await supabase
      .from('news')
      .update(news)
      .select()
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as News
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  async count() {
    const { count, error } = await supabase
      .from('news')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw error
    return count || 0
  }
}
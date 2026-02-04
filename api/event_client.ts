import type { Event, EventInsert, EventUpdate } from '~/types/entities/event'
import { supabase } from './supabase'

export const EventsClient = {
  async getAll() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('start_date', { ascending: false })
    
    if (error) throw error
    return data as Event[]
  },

  async getFutureEvents() {
    const now = new Date().toISOString()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('end_date', now)
      .order('start_date', { ascending: true })
    
    if (error) throw error
    return data as Event[]
  },

  async getPastEvents() {
    const now = new Date().toISOString()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .lt('end_date', now)
      .order('start_date', { ascending: false })
    
    if (error) throw error
    return data as Event[]
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Event
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data as Event
  },

  async getByType(type: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('type', type)
      .order('start_date', { ascending: true })
    
    if (error) throw error
    return data as Event[]
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('category', category)
      .order('start_date', { ascending: true })
    
    if (error) throw error
    return data as Event[]
  },

  async getByLocation(locationId: number) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('location_id', locationId)
      .order('start_date', { ascending: true })
    
    if (error) throw error
    return data as Event[]
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('start_date', { ascending: false })
    
    if (error) throw error
    return data as Event[]
  },

  async getByDateRange(startDate: string, endDate: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_date', startDate)
      .lte('end_date', endDate)
      .order('start_date', { ascending: true })
    
    if (error) throw error
    return data as Event[]
  },

  async create(event: EventInsert) {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single()
    
    if (error) throw error
    return data as Event
  },

  async update(id: number, event: EventUpdate) {
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Event
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  async count() {
    const { count, error } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw error
    return count || 0
  }

}
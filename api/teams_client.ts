import type { Team, TeamInsert, TeamUpdate } from '~/types/entities/teams'
import { supabase } from './supabase'

export const TeamsClient = {
  
  async getAll() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data as Team[]
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('category', category)
      .order('id', { ascending: true })
    
    if (error) throw error
    return data as Team[]
  },

 

  //squadre con i loro piazzamenti
  async getAllWithResults() {
    const { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        placements (
          day_number,
          rank
        )
      `)
      .order('id', { ascending: true }) 
    
    if (error) throw error
    return data 
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Team
  },

  async create(team: TeamInsert) {
    const { data, error } = await supabase
      .from('teams')
      .insert(team)
      .select()
      .single()
    
    if (error) throw error
    return data as Team
  },


  async update(id: string, team: TeamUpdate) {
    const { data, error } = await supabase
      .from('teams')
      .update(team)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Team
  },


  async delete(id: string) {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}
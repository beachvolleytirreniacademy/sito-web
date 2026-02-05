import type { Placement, PlacementInsert, PlacementUpdate } from '~/types/entities/placements'
import type { Team } from '~/types/entities/teams'
import { supabase } from './supabase'

// Definiamo un tipo "Arricchito" che contiene anche i dati della squadra
type PlacementWithTeam = Placement & { teams: Team }

export const PlacementsClient = {
  
   async getAll() {
    const { data, error } = await supabase
      .from('placements')
      .select(`
        *,
        teams!placements_team_id_fkey ( * )
      `)
      .order('team_id', { ascending: true })
    
    if (error) throw error
    return data as PlacementWithTeam[]
  },
  
  async getRankingByDay(dayNumber: number) {
    const { data, error } = await supabase
      .from('placements')
      .select(`
        *,
        teams ( * )
      `)
      .eq('day_number', dayNumber)
      .order('rank', { ascending: true }) // Dal 1° all'ultimo
    
    if (error) throw error
    return data as PlacementWithTeam[]
  },

  async getHistoryByTeam(teamId: string) {
    const { data, error } = await supabase
      .from('placements')
      .select(`
        *,
        teams ( * )
      `)
      .eq('team_id', teamId)
      .order('day_number', { ascending: true }) // Dalla giornata più vecchia
    
    if (error) throw error
    return data as PlacementWithTeam[]
  },

  async create(placement: PlacementInsert) {
    const { data, error } = await supabase
      .from('placements')
      .insert(placement)
      .select()
      .single()
    
    if (error) throw error
    return data as Placement
  },

  async update(id: string, placement: PlacementUpdate) {
    const { data, error } = await supabase
      .from('placements')
      .update(placement)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Placement
  },


  async delete(id: string) {
    const { error } = await supabase
      .from('placements')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}
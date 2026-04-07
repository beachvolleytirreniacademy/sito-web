import type { Partners, PartnerInsert, PartnerUpdate } from '~/types/entities/partners'
import { supabase } from './supabase'

export const PartnersClient = {
  async getAll() {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) throw error
    return data as Partners[]
  },

  async getAllImages() {
    const { data, error } = await supabase
      .from('partners')
      .select('imageURL')
      .not('imageURL', 'is', null) // Esclude i partner senza immagine
    
    if (error) throw error
    
    // Mappa i risultati dichiarando esplicitamente che partner ha una proprietà imageURL
    return data.map((partner: { imageURL: string }) => partner.imageURL)
  },

  async insert(partner: PartnerInsert) {
    const { data, error } = await supabase
      .from('partners')
      .insert(partner)
      .select()
      .single()
    
    if (error) throw error
    return data as Partners
  },

  async update(id: number, partner: PartnerUpdate) {
    const { data, error } = await supabase
      .from('partners')
      .update(partner)
      .select()
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Partners
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}
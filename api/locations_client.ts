import type { Locations, LocationInsert, LocationUpdate } from '~/types/entities/locations'
import { supabase } from './supabase'


export const LocationsClient = {
    

    async getAll() {
        const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('id', { ascending: true })
        
        if (error) throw error
        return data as Location[]
    },

    
    async getById(id: number) {
        const { data, error } = await supabase
        .from('locations')
        .select('*')
        .eq('id', id)
        .single()
        
        if (error) throw error
        return data as Location
    },

  
    async create(location: LocationInsert) {
        const { data, error } = await supabase
        .from('locations')
        .insert(location)
        .select()
        .single()
        
        if (error) throw error
        return data as Location
    },

    
    async update(id: number, location: LocationUpdate) {
        const { data, error } = await supabase
        .from('locations')
        .update(location)
        .eq('id', id)
        .select()
        .single()
        
        if (error) throw error
        return data as Location
    },

    
    async delete(id: number) {
        const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id)
        
        if (error) throw error
        return true
    }
}
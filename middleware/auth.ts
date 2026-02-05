
import { supabase } from '~/api/supabase' 

export default defineNuxtRouteMiddleware(async (to, from) => {
  // 1. Chiediamo a Supabase se c'è una sessione attiva
  const { data: { session } } = await supabase.auth.getSession()

  // 2. Se NON c'è sessione e stai cercando di andare in /admin
  if (!session && to.path.includes('/admin')) {
    // Reindirizza al login
    return navigateTo('/login')
  }
})
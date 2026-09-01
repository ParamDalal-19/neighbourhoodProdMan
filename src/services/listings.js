import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { localData } from '../lib/localBackend.js'

export async function listListings() {
  if (!isSupabaseConfigured) return localData.listListings()
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('recommendation_count', { ascending: false })
  if (error) throw error
  return data
}

export async function getListing(id) {
  if (!isSupabaseConfigured) return localData.getListing(id)
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function searchListings({ query = '', category = 'all' } = {}) {
  if (!isSupabaseConfigured) return localData.searchListings({ query, category })

  let request = supabase.from('listings').select('*')
  if (category !== 'all') {
    request = request.eq('category', category)
  }
  if (query.trim()) {
    const q = query.trim()
    request = request.or(
      `name.ilike.%${q}%,description.ilike.%${q}%,location.ilike.%${q}%`
    )
  }
  const { data, error } = await request.order('recommendation_count', { ascending: false })
  if (error) throw error
  return data
}

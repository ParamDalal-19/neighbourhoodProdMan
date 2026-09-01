import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { localData } from '../lib/localBackend.js'

export async function listRecommendations(listingId) {
  if (!isSupabaseConfigured) return localData.listRecommendations(listingId)

  const { data, error } = await supabase
    .from('recommendations')
    .select('id, listing_id, user_id, rating, comment, created_at, profiles(full_name)')
    .eq('listing_id', listingId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map((r) => ({
    ...r,
    user_name: r.profiles?.full_name || 'Neighbour',
  }))
}

export async function addRecommendation({ listingId, userId, userName, rating, comment }) {
  if (!isSupabaseConfigured) {
    return localData.addRecommendation({ listingId, userId, userName, rating, comment })
  }

  // A database trigger (see supabase/schema.sql) automatically recalculates
  // the listing's rating and recommendation_count after this insert.
  const { data, error } = await supabase
    .from('recommendations')
    .insert({ listing_id: listingId, user_id: userId, rating, comment })
    .select()
    .single()
  if (error) throw error
  return data
}

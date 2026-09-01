import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { localData } from '../lib/localBackend.js'

export async function listSaved(userId) {
  if (!isSupabaseConfigured) return localData.listSaved(userId)

  const { data, error } = await supabase
    .from('saved_listings')
    .select('id, created_at, listings(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
    .filter((s) => s.listings)
    .map((s) => ({ savedId: s.id, savedAt: s.created_at, listing: s.listings }))
}

export async function isSaved(userId, listingId) {
  if (!isSupabaseConfigured) return localData.isSaved(userId, listingId)

  const { data, error } = await supabase
    .from('saved_listings')
    .select('id')
    .eq('user_id', userId)
    .eq('listing_id', listingId)
    .maybeSingle()
  if (error) throw error
  return Boolean(data)
}

export async function saveListing(userId, listingId) {
  if (!isSupabaseConfigured) return localData.saveListing(userId, listingId)

  const { error } = await supabase
    .from('saved_listings')
    .insert({ user_id: userId, listing_id: listingId })
  if (error && error.code !== '23505') throw error // ignore duplicate save races
}

export async function unsaveListing(userId, listingId) {
  if (!isSupabaseConfigured) return localData.unsaveListing(userId, listingId)

  const { error } = await supabase
    .from('saved_listings')
    .delete()
    .eq('user_id', userId)
    .eq('listing_id', listingId)
  if (error) throw error
}

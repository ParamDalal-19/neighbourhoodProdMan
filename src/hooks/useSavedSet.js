import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { listSaved, saveListing, unsaveListing } from '../services/savedListings.js'

/**
 * Tracks the set of listing IDs the current user has saved, and exposes a
 * toggle function used by PlaceCard "save" buttons across Home/Search/Saved.
 */
export function useSavedSet() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [savedIds, setSavedIds] = useState(new Set())
  const [pendingId, setPendingId] = useState(null)

  useEffect(() => {
    let cancelled = false
    if (!user) {
      setSavedIds(new Set())
      return
    }
    listSaved(user.id).then((rows) => {
      if (!cancelled) setSavedIds(new Set(rows.map((r) => r.listing.id)))
    })
    return () => {
      cancelled = true
    }
  }, [user])

  const toggleSave = useCallback(
    async (listing) => {
      if (!user) return
      setPendingId(listing.id)
      const alreadySaved = savedIds.has(listing.id)
      try {
        if (alreadySaved) {
          await unsaveListing(user.id, listing.id)
          setSavedIds((prev) => {
            const next = new Set(prev)
            next.delete(listing.id)
            return next
          })
          showToast(`Removed ${listing.name} from Saved`, 'info')
        } else {
          await saveListing(user.id, listing.id)
          setSavedIds((prev) => new Set(prev).add(listing.id))
          showToast(`Saved ${listing.name}`)
        }
      } catch {
        showToast('Something went wrong. Please try again.', 'error')
      } finally {
        setPendingId(null)
      }
    },
    [user, savedIds, showToast]
  )

  return { savedIds, toggleSave, pendingId }
}

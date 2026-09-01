import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { listSaved, unsaveListing } from '../services/savedListings.js'
import PlaceCard from '../components/PlaceCard.jsx'
import { PlaceCardSkeletonList } from '../components/Skeletons.jsx'
import EmptyState from '../components/EmptyState.jsx'

export default function Saved() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [saved, setSaved] = useState([])
  const [loading, setLoading] = useState(true)
  const [pendingId, setPendingId] = useState(null)

  useEffect(() => {
    let cancelled = false
    if (!user) return
    setLoading(true)
    listSaved(user.id).then((rows) => {
      if (!cancelled) {
        setSaved(rows)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [user])

  async function handleUnsave(listing) {
    setPendingId(listing.id)
    try {
      await unsaveListing(user.id, listing.id)
      setSaved((prev) => prev.filter((s) => s.listing.id !== listing.id))
      showToast(`Removed ${listing.name} from Saved`, 'info')
    } catch {
      showToast('Something went wrong. Please try again.', 'error')
    } finally {
      setPendingId(null)
    }
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Saved Places</h1>
        <p className="mt-1 text-sm text-ink-500">Places you've bookmarked to visit later.</p>
      </div>

      {loading ? (
        <PlaceCardSkeletonList count={3} />
      ) : saved.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="You haven't saved any places yet"
          description="Explore Home or Search and tap the heart icon to save places you want to try."
          action={
            <button onClick={() => navigate('/home')} className="btn-primary">
              Discover places
            </button>
          }
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {saved.map(({ savedId, listing }) => (
            <PlaceCard
              key={savedId}
              listing={listing}
              isSaved
              saving={pendingId === listing.id}
              onToggleSave={handleUnsave}
            />
          ))}
        </div>
      )}
    </div>
  )
}

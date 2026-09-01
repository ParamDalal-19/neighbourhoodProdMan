import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, MessageSquarePlus, MessageSquare } from 'lucide-react'
import { getListing } from '../services/listings.js'
import { listRecommendations } from '../services/recommendations.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useSavedSet } from '../hooks/useSavedSet.js'
import CategoryIcon from '../components/CategoryIcon.jsx'
import { RatingBadge } from '../components/RatingStars.jsx'
import { categoryLabel } from '../data/categories.js'
import EmptyState from '../components/EmptyState.jsx'

export default function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { savedIds, toggleSave, pendingId } = useSavedSet()

  const [listing, setListing] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)

    Promise.all([getListing(id), listRecommendations(id)]).then(([listingData, recs]) => {
      if (cancelled) return
      if (!listingData) {
        setNotFound(true)
      } else {
        setListing(listingData)
        setRecommendations(recs)
      }
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl animate-fade-in space-y-4">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-40 w-full" />
        <div className="skeleton h-24 w-full" />
      </div>
    )
  }

  if (notFound || !listing) {
    return (
      <div className="mx-auto max-w-2xl">
        <EmptyState
          title="Place not found"
          description="This listing may have been removed."
          action={
            <button onClick={() => navigate('/home')} className="btn-primary">
              Back to Home
            </button>
          }
        />
      </div>
    )
  }

  const isSaved = savedIds.has(listing.id)

  return (
    <div className="mx-auto max-w-2xl animate-fade-in space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-ink-900"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="card p-6">
        <div className="flex items-start gap-4">
          <CategoryIcon category={listing.category} size="lg" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-ink-900">{listing.name}</h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-500">
              <span className="tag">{categoryLabel(listing.category)}</span>
              <span>·</span>
              <span>{listing.location}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <RatingBadge rating={listing.rating} />
              <span className="text-sm text-ink-500">
                {listing.recommendation_count} recommendation
                {listing.recommendation_count === 1 ? '' : 's'}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-ink-700">{listing.description}</p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            onClick={() => toggleSave(listing)}
            disabled={pendingId === listing.id}
            aria-label={isSaved ? 'Unsave place' : 'Save place'}
            data-testid="listing-save-toggle"
            className={isSaved ? 'btn-secondary flex-1' : 'btn-primary flex-1'}
          >
            <Heart size={17} className={isSaved ? 'fill-primary-600 text-primary-600' : ''} />
            {isSaved ? 'Saved' : 'Save place'}
          </button>
          <Link to={`/recommend?listing=${listing.id}`} className="btn-secondary flex-1">
            <MessageSquarePlus size={17} />
            Recommend this place
          </Link>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-500">
          Recommendations ({recommendations.length})
        </h2>

        {recommendations.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No recommendations yet"
            description="Be the first person in your neighbourhood to recommend this place."
            action={
              <Link to={`/recommend?listing=${listing.id}`} className="btn-primary btn-sm">
                Recommend this place
              </Link>
            }
          />
        ) : (
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div key={rec.id} className="card p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                      {(rec.user_name || 'N')[0].toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold text-ink-900">
                      {rec.user_id === user?.id ? 'You' : rec.user_name || 'Neighbour'}
                    </span>
                  </div>
                  <RatingBadge rating={rec.rating} />
                </div>
                <p className="mt-2.5 text-sm text-ink-700">{rec.comment}</p>
                <p className="mt-2 text-xs text-ink-400">
                  {new Date(rec.created_at).toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

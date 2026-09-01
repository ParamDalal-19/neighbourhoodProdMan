import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useSavedSet } from '../hooks/useSavedSet.js'
import { listListings } from '../services/listings.js'
import { CATEGORIES } from '../data/categories.js'
import SearchBar from '../components/SearchBar.jsx'
import CategoryPill from '../components/CategoryPill.jsx'
import PlaceCard from '../components/PlaceCard.jsx'
import { PlaceCardSkeletonList } from '../components/Skeletons.jsx'
import EmptyState from '../components/EmptyState.jsx'
import CategoryIcon from '../components/CategoryIcon.jsx'
import { SearchX } from 'lucide-react'

export default function Home() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const { savedIds, toggleSave, pendingId } = useSavedSet()

  const [query, setQuery] = useState('')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    listListings().then((data) => {
      if (!cancelled) {
        setListings(data)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  function handleSearchSubmit(value) {
    const params = new URLSearchParams()
    if (value.trim()) params.set('q', value.trim())
    navigate(`/search?${params.toString()}`)
  }

  const firstName = profile?.full_name?.split(' ')[0] || 'there'
  const neighbourhood = profile?.neighbourhood || 'your neighbourhood'
  const popular = [...listings].sort((a, b) => b.recommendation_count - a.recommendation_count)

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">
          Hi {firstName} 👋
        </h1>
        <p className="mt-1 text-ink-600">What&apos;s good in {neighbourhood}?</p>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearchSubmit}
        placeholder="Search cafes, gyms, salons..."
      />

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-500">
          Browse by category
        </h2>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {CATEGORIES.map((c) => (
            <CategoryPill
              key={c.id}
              onClick={() => navigate(`/search?cat=${c.id}`)}
            >
              <CategoryIconInline category={c.id} />
              {c.label}
            </CategoryPill>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            Popular near you
          </h2>
          <button
            onClick={() => navigate('/search')}
            className="text-sm font-semibold text-primary-600 hover:underline"
          >
            See all
          </button>
        </div>

        {loading ? (
          <PlaceCardSkeletonList count={5} />
        ) : popular.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No places yet"
            description="Check back soon — new recommendations are added regularly."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {popular.map((listing) => (
              <PlaceCard
                key={listing.id}
                listing={listing}
                isSaved={savedIds.has(listing.id)}
                saving={pendingId === listing.id}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryIconInline({ category }) {
  return <CategoryIcon category={category} size="sm" inline />
}

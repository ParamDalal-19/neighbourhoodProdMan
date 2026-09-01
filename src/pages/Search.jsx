import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchListings } from '../services/listings.js'
import { CATEGORIES, categoryLabel } from '../data/categories.js'
import { useSavedSet } from '../hooks/useSavedSet.js'
import SearchBar from '../components/SearchBar.jsx'
import CategoryPill from '../components/CategoryPill.jsx'
import PlaceCard from '../components/PlaceCard.jsx'
import { PlaceCardSkeletonList } from '../components/Skeletons.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { SearchX } from 'lucide-react'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const category = params.get('cat') || 'all'

  const [inputValue, setInputValue] = useState(query)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const { savedIds, toggleSave, pendingId } = useSavedSet()

  useEffect(() => {
    setInputValue(query)
  }, [query])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    searchListings({ query, category }).then((data) => {
      if (!cancelled) {
        setResults(data)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [query, category])

  function updateParams(next) {
    const merged = { q: query, cat: category, ...next }
    const p = new URLSearchParams()
    if (merged.q) p.set('q', merged.q)
    if (merged.cat && merged.cat !== 'all') p.set('cat', merged.cat)
    setParams(p)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Search</h1>
        <p className="mt-1 text-sm text-ink-500">Find places recommended near you.</p>
      </div>

      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={(v) => updateParams({ q: v })}
        placeholder="Search cafes, gyms, salons..."
        autoFocus
      />

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <CategoryPill active={category === 'all'} onClick={() => updateParams({ cat: 'all' })}>
          All
        </CategoryPill>
        {CATEGORIES.map((c) => (
          <CategoryPill
            key={c.id}
            active={category === c.id}
            onClick={() => updateParams({ cat: c.id })}
          >
            {c.label}
          </CategoryPill>
        ))}
      </div>

      <div>
        {!loading && (
          <p className="mb-3 text-sm text-ink-500">
            {results.length} place{results.length === 1 ? '' : 's'}
            {category !== 'all' ? ` in ${categoryLabel(category)}` : ''}
            {query ? ` matching "${query}"` : ''}
          </p>
        )}

        {loading ? (
          <PlaceCardSkeletonList count={5} />
        ) : results.length === 0 ? (
          <EmptyState
            icon={SearchX}
            title="No places match"
            description="Try a different search term or category filter."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {results.map((listing) => (
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

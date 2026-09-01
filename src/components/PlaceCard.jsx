import { Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CategoryIcon from './CategoryIcon.jsx'
import { RatingBadge } from './RatingStars.jsx'
import { categoryLabel } from '../data/categories.js'

export default function PlaceCard({ listing, isSaved, onToggleSave, saving }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/listing/${listing.id}`)}
      className="card group relative flex cursor-pointer gap-4 p-4 transition-shadow hover:shadow-card-hover"
    >
      <CategoryIcon category={listing.category} size="lg" />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-base font-semibold text-ink-900">{listing.name}</h3>
          <button
            type="button"
            disabled={saving}
            onClick={(e) => {
              e.stopPropagation()
              onToggleSave?.(listing)
            }}
            aria-label={isSaved ? 'Unsave place' : 'Save place'}
            className="-mr-1 -mt-1 shrink-0 rounded-full p-2 transition-colors hover:bg-ink-100 disabled:opacity-50"
          >
            <Heart
              size={20}
              className={isSaved ? 'fill-primary-600 text-primary-600' : 'text-ink-400'}
            />
          </button>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-500">
          <span className="tag">{categoryLabel(listing.category)}</span>
          <span>·</span>
          <span className="truncate">{listing.location}</span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-ink-600">{listing.description}</p>

        <div className="mt-3 flex items-center gap-3">
          <RatingBadge rating={listing.rating} />
          <span className="text-xs text-ink-500">
            {listing.recommendation_count} recommendation
            {listing.recommendation_count === 1 ? '' : 's'}
          </span>
        </div>
      </div>
    </div>
  )
}

import { Star } from 'lucide-react'

/** Read-only rating badge, e.g. ★ 4.6 */
export function RatingBadge({ rating, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-semibold text-ink-800 ${className}`}>
      <Star size={15} className="fill-amber-400 text-amber-400" />
      {rating?.toFixed ? rating.toFixed(1) : rating}
    </span>
  )
}

/** Interactive 1-5 star selector used in the Add Recommendation form */
export function RatingInput({ value, onChange, error }) {
  return (
    <div>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
            className="rounded-md p-1 transition-transform hover:scale-110 active:scale-95"
          >
            <Star
              size={30}
              className={n <= value ? 'fill-amber-400 text-amber-400' : 'text-ink-200'}
              strokeWidth={1.5}
            />
          </button>
        ))}
        {value > 0 && (
          <span className="ml-2 text-sm font-medium text-ink-600">{value} / 5</span>
        )}
      </div>
      {error && <p className="field-error">{error}</p>}
    </div>
  )
}

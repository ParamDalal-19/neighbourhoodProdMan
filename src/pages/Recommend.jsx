import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Search, X } from 'lucide-react'
import { listListings, getListing } from '../services/listings.js'
import { addRecommendation } from '../services/recommendations.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { RatingInput } from '../components/RatingStars.jsx'
import CategoryIcon from '../components/CategoryIcon.jsx'
import { categoryLabel } from '../data/categories.js'

export default function Recommend() {
  const [params] = useSearchParams()
  const preselectedId = params.get('listing')
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const { showToast } = useToast()

  const [allListings, setAllListings] = useState([])
  const [selectedListing, setSelectedListing] = useState(null)
  const [listingQuery, setListingQuery] = useState('')
  const [showPicker, setShowPicker] = useState(!preselectedId)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    listListings().then(setAllListings)
  }, [])

  useEffect(() => {
    if (preselectedId) {
      getListing(preselectedId).then((l) => {
        if (l) setSelectedListing(l)
      })
    }
  }, [preselectedId])

  const filteredListings = useMemo(() => {
    const q = listingQuery.trim().toLowerCase()
    if (!q) return allListings.slice(0, 8)
    return allListings
      .filter(
        (l) =>
          l.name.toLowerCase().includes(q) || l.location.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [allListings, listingQuery])

  function validate() {
    const next = {}
    if (!selectedListing) next.listing = 'Please choose a place to recommend.'
    if (rating === 0) next.rating = 'Please select a rating.'
    if (!comment.trim()) next.comment = 'Please share a short comment.'
    else if (comment.trim().length < 10) next.comment = 'Comment must be at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setFormError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      await addRecommendation({
        listingId: selectedListing.id,
        userId: user.id,
        userName: profile?.full_name || 'Neighbour',
        rating,
        comment: comment.trim(),
      })
      showToast('Recommendation submitted — thank you!')
      navigate(`/listing/${selectedListing.id}`, { replace: true })
    } catch (err) {
      setFormError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl animate-fade-in space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-ink-900"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div>
        <h1 className="text-xl font-bold text-ink-900">Add a recommendation</h1>
        <p className="mt-1 text-sm text-ink-500">
          Help your neighbours discover a place worth visiting.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-5 p-6" noValidate>
        {formError && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {formError}
          </div>
        )}

        <div>
          <label className="label">Place</label>

          {selectedListing && !showPicker ? (
            <div className="flex items-center gap-3 rounded-xl border border-ink-200 bg-ink-50 p-3">
              <CategoryIcon category={selectedListing.category} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink-900">
                  {selectedListing.name}
                </p>
                <p className="truncate text-xs text-ink-500">
                  {categoryLabel(selectedListing.category)} · {selectedListing.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPicker(true)}
                className="shrink-0 text-xs font-semibold text-primary-600 hover:underline"
              >
                Change
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="relative">
                <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="text"
                  value={listingQuery}
                  onChange={(e) => setListingQuery(e.target.value)}
                  placeholder="Search for a place..."
                  className="input pl-10"
                  autoFocus
                />
              </div>
              <div className="max-h-56 space-y-1 overflow-y-auto rounded-xl border border-ink-100 p-1.5">
                {filteredListings.length === 0 ? (
                  <p className="p-3 text-sm text-ink-400">No places match your search.</p>
                ) : (
                  filteredListings.map((l) => (
                    <button
                      type="button"
                      key={l.id}
                      onClick={() => {
                        setSelectedListing(l)
                        setShowPicker(false)
                        setErrors((prev) => ({ ...prev, listing: undefined }))
                      }}
                      className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-ink-50"
                    >
                      <CategoryIcon category={l.category} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink-900">{l.name}</p>
                        <p className="truncate text-xs text-ink-500">{l.location}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
          {errors.listing && <p className="field-error">{errors.listing}</p>}
        </div>

        <div>
          <label className="label">Your rating</label>
          <RatingInput value={rating} onChange={setRating} error={errors.rating} />
        </div>

        <div>
          <label className="label" htmlFor="comment">Your recommendation</label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like about this place? Anything others should know?"
            className={`input resize-none ${errors.comment ? 'input-error' : ''}`}
          />
          {errors.comment && <p className="field-error">{errors.comment}</p>}
        </div>

        <div className="flex gap-2.5">
          <button type="submit" disabled={submitting} className="btn-primary flex-1">
            {submitting ? 'Submitting…' : 'Submit Recommendation'}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="btn-ghost">
            <X size={17} /> Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

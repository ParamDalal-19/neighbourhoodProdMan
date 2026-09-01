export function PlaceCardSkeleton() {
  return (
    <div className="card flex gap-4 p-4">
      <div className="skeleton h-16 w-16 shrink-0" />
      <div className="flex-1 space-y-2.5 py-1">
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-4/5" />
      </div>
    </div>
  )
}

export function PlaceCardSkeletonList({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <PlaceCardSkeleton key={i} />
      ))}
    </div>
  )
}

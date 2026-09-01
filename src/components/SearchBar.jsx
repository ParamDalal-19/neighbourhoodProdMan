import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange, onSubmit, placeholder, autoFocus }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(value)
      }}
      className="relative"
    >
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
      />
      <input
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search cafes, gyms, salons...'}
        className="input pl-11 pr-10"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-600"
        >
          <X size={16} />
        </button>
      )}
    </form>
  )
}

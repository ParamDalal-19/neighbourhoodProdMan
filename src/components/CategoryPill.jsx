export default function CategoryPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pill ${active ? 'pill-active' : ''}`}
    >
      {children}
    </button>
  )
}

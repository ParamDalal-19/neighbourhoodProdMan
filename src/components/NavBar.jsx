import { NavLink } from 'react-router-dom'
import { Home, Search, Plus, Bookmark, User } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/recommend', label: 'Add', icon: Plus, emphasize: true },
  { to: '/saved', label: 'Saved', icon: Bookmark },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function NavBar() {
  return (
    <>
      {/* Desktop top nav */}
      <header className="sticky top-0 z-40 hidden border-b border-ink-100 bg-white/90 backdrop-blur sm:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <NavLink to="/home" className="flex items-center gap-2 text-lg font-extrabold text-ink-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              N
            </span>
            Neighbourhood
          </NavLink>
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.filter((i) => !i.emphasize).map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-600 hover:bg-ink-100'
                  }`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </nav>
          <NavLink to="/recommend" className="btn-primary btn-sm">
            <Plus size={16} /> Add Recommendation
          </NavLink>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink-100 bg-white/95 backdrop-blur sm:hidden">
        <div className="flex items-center justify-around px-2 py-1.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon, emphasize }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-primary-600' : 'text-ink-500'
                }`
              }
            >
              {({ isActive }) =>
                emphasize ? (
                  <>
                    <span className="-mt-5 flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-600/30">
                      <Icon size={20} />
                    </span>
                    <span className={isActive ? 'text-primary-600' : 'text-ink-500'}>{label}</span>
                  </>
                ) : (
                  <>
                    <Icon size={20} className={isActive ? 'text-primary-600' : 'text-ink-400'} />
                    {label}
                  </>
                )
              }
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}

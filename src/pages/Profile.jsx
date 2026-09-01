import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, LogOut, MapPin, MessageSquarePlus, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { listSaved } from '../services/savedListings.js'

export default function Profile() {
  const { user, profile, signOut } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [savedCount, setSavedCount] = useState(0)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (user) listSaved(user.id).then((rows) => setSavedCount(rows.length))
  }, [user])

  async function handleLogout() {
    setSigningOut(true)
    try {
      await signOut()
      showToast('Logged out successfully')
      navigate('/', { replace: true })
    } finally {
      setSigningOut(false)
    }
  }

  const initial = (profile?.full_name || user?.email || 'N')[0].toUpperCase()

  return (
    <div className="mx-auto max-w-lg animate-fade-in space-y-6">
      <div className="card p-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-2xl font-bold text-primary-700">
          {initial}
        </div>
        <h1 className="mt-3 text-xl font-bold text-ink-900">
          {profile?.full_name || 'Neighbour'}
        </h1>
        <p className="text-sm text-ink-500">{profile?.email || user?.email}</p>
        {profile?.neighbourhood && (
          <div className="mt-2 inline-flex items-center gap-1 text-sm text-ink-500">
            <MapPin size={14} /> {profile.neighbourhood}
          </div>
        )}

        <div className="mt-5 flex justify-center gap-8 border-t border-ink-100 pt-5">
          <div>
            <p className="text-lg font-bold text-ink-900">{savedCount}</p>
            <p className="text-xs text-ink-500">Places saved</p>
          </div>
        </div>
      </div>

      <div className="card divide-y divide-ink-100">
        <button
          onClick={() => navigate('/saved')}
          className="flex w-full items-center justify-between p-4 text-left hover:bg-ink-50"
        >
          <span className="flex items-center gap-3 text-sm font-medium text-ink-900">
            <Bookmark size={18} className="text-ink-500" /> Saved Places
          </span>
          <ChevronRight size={18} className="text-ink-400" />
        </button>
        <button
          onClick={() => navigate('/recommend')}
          className="flex w-full items-center justify-between p-4 text-left hover:bg-ink-50"
        >
          <span className="flex items-center gap-3 text-sm font-medium text-ink-900">
            <MessageSquarePlus size={18} className="text-ink-500" /> Add a Recommendation
          </span>
          <ChevronRight size={18} className="text-ink-400" />
        </button>
      </div>

      <button
        onClick={handleLogout}
        disabled={signingOut}
        className="btn-danger w-full"
      >
        <LogOut size={17} />
        {signingOut ? 'Logging out…' : 'Log Out'}
      </button>
    </div>
  )
}

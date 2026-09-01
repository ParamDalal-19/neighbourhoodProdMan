// Local, browser-only backend used when Supabase env vars are not configured.
// It mirrors the shape of the Supabase-backed service functions so the rest
// of the app never needs to know which backend is active. This lets the app
// be opened and fully demoed (signup, login, save, recommend, etc.) without
// any setup, while src/services/*.js talk to real Supabase once configured.
//
// DEMO ONLY: passwords are stored in plain text in localStorage. This is
// never used when Supabase auth is configured and must never be treated as
// a real auth system.
import { SEED_LISTINGS } from '../data/seedListings.js'

const KEYS = {
  users: 'nh_demo_users',
  session: 'nh_demo_session',
  listings: 'nh_demo_listings',
  recommendations: 'nh_demo_recommendations',
  saved: 'nh_demo_saved',
}

const delay = (ms = 220) => new Promise((res) => setTimeout(res, ms))

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function ensureSeeded() {
  if (!localStorage.getItem(KEYS.listings)) {
    write(KEYS.listings, SEED_LISTINGS)
  }
  if (!localStorage.getItem(KEYS.users)) write(KEYS.users, [])
  if (!localStorage.getItem(KEYS.recommendations)) write(KEYS.recommendations, [])
  if (!localStorage.getItem(KEYS.saved)) write(KEYS.saved, [])
}

ensureSeeded()

const listeners = new Set()
function emitAuthChange(session) {
  listeners.forEach((cb) => cb(session))
}

function uid(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function currentSession() {
  return read(KEYS.session, null)
}

function findUserByEmail(email) {
  const users = read(KEYS.users, [])
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase())
}

function findUserById(id) {
  const users = read(KEYS.users, [])
  return users.find((u) => u.id === id)
}

export const localAuth = {
  async getSession() {
    await delay(80)
    return currentSession()
  },

  onAuthStateChange(callback) {
    listeners.add(callback)
    return {
      unsubscribe: () => listeners.delete(callback),
    }
  },

  async signUp({ email, password, fullName, neighbourhood }) {
    await delay()
    if (findUserByEmail(email)) {
      throw new Error('An account with this email already exists.')
    }
    const users = read(KEYS.users, [])
    const user = {
      id: uid('user'),
      email,
      password,
      full_name: fullName,
      neighbourhood,
      avatar_url: null,
      created_at: new Date().toISOString(),
    }
    users.push(user)
    write(KEYS.users, users)
    const session = { userId: user.id }
    write(KEYS.session, session)
    emitAuthChange(session)
    return { user }
  },

  async signIn({ email, password }) {
    await delay()
    const user = findUserByEmail(email)
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password.')
    }
    const session = { userId: user.id }
    write(KEYS.session, session)
    emitAuthChange(session)
    return { user }
  },

  async signOut() {
    await delay(100)
    localStorage.removeItem(KEYS.session)
    emitAuthChange(null)
  },

  getProfileSync(userId) {
    const user = findUserById(userId)
    if (!user) return null
    return {
      id: user.id,
      full_name: user.full_name,
      neighbourhood: user.neighbourhood,
      avatar_url: user.avatar_url,
      email: user.email,
      created_at: user.created_at,
    }
  },
}

export const localData = {
  async listListings() {
    await delay()
    return read(KEYS.listings, [])
  },

  async getListing(id) {
    await delay(150)
    const listings = read(KEYS.listings, [])
    return listings.find((l) => l.id === id) || null
  },

  async searchListings({ query = '', category = 'all' } = {}) {
    await delay()
    const listings = read(KEYS.listings, [])
    const q = query.trim().toLowerCase()
    return listings.filter((l) => {
      const matchesCategory = category === 'all' || l.category === category
      const matchesQuery =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  },

  async listRecommendations(listingId) {
    await delay(150)
    const recs = read(KEYS.recommendations, [])
    return recs
      .filter((r) => r.listing_id === listingId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },

  async addRecommendation({ listingId, userId, userName, rating, comment }) {
    await delay()
    const recs = read(KEYS.recommendations, [])
    const rec = {
      id: uid('rec'),
      listing_id: listingId,
      user_id: userId,
      user_name: userName,
      rating,
      comment,
      created_at: new Date().toISOString(),
    }
    recs.push(rec)
    write(KEYS.recommendations, recs)

    // Recalculate listing rating + recommendation_count
    const listings = read(KEYS.listings, [])
    const idx = listings.findIndex((l) => l.id === listingId)
    if (idx !== -1) {
      const listingRecs = recs.filter((r) => r.listing_id === listingId)
      const avg =
        listingRecs.reduce((sum, r) => sum + r.rating, 0) / listingRecs.length
      listings[idx] = {
        ...listings[idx],
        rating: Math.round(avg * 10) / 10,
        recommendation_count: listingRecs.length,
      }
      write(KEYS.listings, listings)
    }
    return rec
  },

  async listSaved(userId) {
    await delay()
    const saved = read(KEYS.saved, [])
    const listings = read(KEYS.listings, [])
    return saved
      .filter((s) => s.user_id === userId)
      .map((s) => ({
        savedId: s.id,
        savedAt: s.created_at,
        listing: listings.find((l) => l.id === s.listing_id),
      }))
      .filter((s) => s.listing)
      .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
  },

  async isSaved(userId, listingId) {
    const saved = read(KEYS.saved, [])
    return saved.some((s) => s.user_id === userId && s.listing_id === listingId)
  },

  async saveListing(userId, listingId) {
    await delay(150)
    const saved = read(KEYS.saved, [])
    if (saved.some((s) => s.user_id === userId && s.listing_id === listingId)) {
      return
    }
    saved.push({
      id: uid('saved'),
      user_id: userId,
      listing_id: listingId,
      created_at: new Date().toISOString(),
    })
    write(KEYS.saved, saved)
  },

  async unsaveListing(userId, listingId) {
    await delay(150)
    const saved = read(KEYS.saved, [])
    write(
      KEYS.saved,
      saved.filter((s) => !(s.user_id === userId && s.listing_id === listingId))
    )
  },
}

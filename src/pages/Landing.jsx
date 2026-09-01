import { Link } from 'react-router-dom'
import { Coffee, UtensilsCrossed, Dumbbell, Scissors, Stethoscope, ShoppingBasket, Search, Heart, MessageSquarePlus } from 'lucide-react'
import { CATEGORIES } from '../data/categories.js'

const CATEGORY_ICONS = {
  cafes: Coffee,
  restaurants: UtensilsCrossed,
  gyms: Dumbbell,
  salons: Scissors,
  doctors: Stethoscope,
  grocery: ShoppingBasket,
  services: ShoppingBasket,
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2 text-lg font-extrabold text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
            N
          </span>
          Neighbourhood
        </div>
        <Link to="/login" className="btn-ghost btn-sm">
          Log In
        </Link>
      </header>

      <section className="mx-auto max-w-4xl px-6 pb-16 pt-10 text-center sm:pb-24 sm:pt-16">
        <span className="tag-primary mb-5 inline-flex">Now live in Andheri, Mumbai</span>
        <h1 className="text-4xl font-extrabold leading-tight text-ink-900 sm:text-5xl">
          Discover the places your{' '}
          <span className="text-primary-600">neighbourhood</span> actually recommends.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-600">
          Skip the anonymous star ratings. Find cafes, gyms, salons, doctors and more —
          recommended by real people who live near you.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/signup" className="btn-primary w-full sm:w-auto">
            Get Started
          </Link>
          <Link to="/login" className="btn-secondary w-full sm:w-auto">
            Log In
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.id]
            return (
              <span key={c.id} className="pill cursor-default hover:border-ink-200 hover:bg-white">
                <Icon size={15} />
                {c.label}
              </span>
            )
          })}
        </div>
      </section>

      <section className="border-t border-ink-100 bg-ink-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 sm:grid-cols-3">
          <HowItWorksCard
            icon={Search}
            step="1"
            title="Discover"
            description="Browse places by category or search for exactly what you need — cafe to work from, gym, salon, and more."
          />
          <HowItWorksCard
            icon={Heart}
            step="2"
            title="Save"
            description="Bookmark places you want to try later, all in one list you can revisit from your profile anytime."
          />
          <HowItWorksCard
            icon={MessageSquarePlus}
            step="3"
            title="Recommend"
            description="Tried somewhere great? Leave a rating and a quick note to help others in your neighbourhood."
          />
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-ink-400">
        Neighbourhood — a local discovery MVP.
      </footer>
    </div>
  )
}

function HowItWorksCard({ icon: Icon, step, title, description }) {
  return (
    <div className="card p-6 text-left">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
        <Icon size={20} />
      </div>
      <div className="mb-1 text-xs font-bold uppercase tracking-wide text-primary-600">
        Step {step}
      </div>
      <h3 className="text-lg font-bold text-ink-900">{title}</h3>
      <p className="mt-1.5 text-sm text-ink-600">{description}</p>
    </div>
  )
}

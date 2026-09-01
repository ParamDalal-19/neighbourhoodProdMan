import {
  Coffee,
  UtensilsCrossed,
  Dumbbell,
  Scissors,
  Stethoscope,
  ShoppingBasket,
  Wrench,
} from 'lucide-react'

const CONFIG = {
  cafes: { icon: Coffee, bg: 'bg-amber-100', text: 'text-amber-700' },
  restaurants: { icon: UtensilsCrossed, bg: 'bg-rose-100', text: 'text-rose-700' },
  gyms: { icon: Dumbbell, bg: 'bg-blue-100', text: 'text-blue-700' },
  salons: { icon: Scissors, bg: 'bg-purple-100', text: 'text-purple-700' },
  doctors: { icon: Stethoscope, bg: 'bg-teal-100', text: 'text-teal-700' },
  grocery: { icon: ShoppingBasket, bg: 'bg-green-100', text: 'text-green-700' },
  services: { icon: Wrench, bg: 'bg-slate-200', text: 'text-slate-700' },
}

export default function CategoryIcon({ category, size = 'md', inline = false, className = '' }) {
  const cfg = CONFIG[category] || CONFIG.services
  const Icon = cfg.icon

  if (inline) {
    const iconSize = size === 'sm' ? 15 : 18
    return <Icon size={iconSize} strokeWidth={2.2} className={`${cfg.text} ${className}`} />
  }

  const sizeClasses = size === 'lg' ? 'h-16 w-16' : size === 'sm' ? 'h-9 w-9' : 'h-12 w-12'
  const iconSize = size === 'lg' ? 28 : size === 'sm' ? 16 : 22

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl ${cfg.bg} ${cfg.text} ${sizeClasses} ${className}`}
    >
      <Icon size={iconSize} strokeWidth={2.2} />
    </div>
  )
}

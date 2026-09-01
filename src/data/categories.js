export const CATEGORIES = [
  { id: 'cafes', label: 'Cafes', icon: 'Coffee' },
  { id: 'restaurants', label: 'Restaurants', icon: 'UtensilsCrossed' },
  { id: 'gyms', label: 'Gyms', icon: 'Dumbbell' },
  { id: 'salons', label: 'Salons', icon: 'Scissors' },
  { id: 'doctors', label: 'Doctors', icon: 'Stethoscope' },
  { id: 'grocery', label: 'Grocery', icon: 'ShoppingBasket' },
  { id: 'services', label: 'Services', icon: 'Wrench' },
]

export const categoryLabel = (id) =>
  CATEGORIES.find((c) => c.id === id)?.label || id

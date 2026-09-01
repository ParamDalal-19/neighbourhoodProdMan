// Realistic sample data representing places in and around Andheri, Mumbai.
// Used to seed the local demo backend and mirrored in supabase/seed.sql.
export const SEED_LISTINGS = [
  {
    id: 'l-cafe-01',
    name: 'Subko Coffee Roasters',
    category: 'cafes',
    description:
      'Specialty coffee roastery with a bright, plant-filled seating area. Great filter coffee, reliable wifi, and quiet corners that make it a favourite for remote work.',
    location: 'Yari Road, Versova',
    rating: 4.7,
    recommendation_count: 132,
  },
  {
    id: 'l-cafe-02',
    name: 'Third Wave Coffee',
    category: 'cafes',
    description:
      'Bright, laptop-friendly cafe with strong cold brews and a rotating pastry counter. Gets busy after 6pm, mornings are ideal for focused work.',
    location: 'Lokhandwala Complex',
    rating: 4.4,
    recommendation_count: 98,
  },
  {
    id: 'l-cafe-03',
    name: "The Baker's Dozen",
    category: 'cafes',
    description:
      'Neighbourhood bakery-cafe known for sourdough and small-batch cakes. Limited seating but worth it for the almond croissants alone.',
    location: 'Oshiwara',
    rating: 4.6,
    recommendation_count: 76,
  },
  {
    id: 'l-cafe-04',
    name: 'Prithvi Cafe',
    category: 'cafes',
    description:
      'Cozy, no-frills cafe attached to the theatre — old-school charm, cheap filter coffee, and a great spot to people-watch between shows.',
    location: 'Juhu-Andheri Link Rd',
    rating: 4.3,
    recommendation_count: 54,
  },
  {
    id: 'l-rest-01',
    name: 'Swati Snacks',
    category: 'restaurants',
    description:
      'Long-running Gujarati-Kathiawadi spot loved for panki chatni and their handvo. Expect a short wait on weekends, always worth it.',
    location: 'Andheri West',
    rating: 4.8,
    recommendation_count: 210,
  },
  {
    id: 'l-rest-02',
    name: 'Bastian Air Bar',
    category: 'restaurants',
    description:
      'Lively seafood-forward menu with a rooftop bar. Better for a weekend dinner out than a quick weekday meal — book ahead.',
    location: 'Versova',
    rating: 4.5,
    recommendation_count: 187,
  },
  {
    id: 'l-rest-03',
    name: 'Pali Village Cafe',
    category: 'restaurants',
    description:
      'All-day dining spot with a relaxed patio. Solid brunch menu and a good middle-ground for group meals with mixed dietary preferences.',
    location: 'Yari Road',
    rating: 4.4,
    recommendation_count: 143,
  },
  {
    id: 'l-rest-04',
    name: 'Kokum Curry House',
    category: 'restaurants',
    description:
      'Homestyle Malvani thalis and fresh seafood curries. Small, family-run place — go early for lunch, it fills up fast.',
    location: 'Four Bungalows',
    rating: 4.6,
    recommendation_count: 89,
  },
  {
    id: 'l-gym-01',
    name: 'Cult.fit Andheri West',
    category: 'gyms',
    description:
      'Well-equipped functional training gym with group classes throughout the day. Clean, well-maintained, and easy to drop into for a single class.',
    location: 'Andheri West',
    rating: 4.5,
    recommendation_count: 164,
  },
  {
    id: 'l-gym-02',
    name: "Gold's Gym Lokhandwala",
    category: 'gyms',
    description:
      'Large strength-training floor with a solid range of free weights. Peak hours (7-9pm) get crowded — mornings are much quieter.',
    location: 'Lokhandwala',
    rating: 4.3,
    recommendation_count: 121,
  },
  {
    id: 'l-gym-03',
    name: 'The Yoga Studio',
    category: 'gyms',
    description:
      'Small-group Hatha and Vinyasa classes in a calm, no-mirrors studio. Instructors are attentive to beginners — a nice alternative to a big gym.',
    location: 'Oshiwara',
    rating: 4.7,
    recommendation_count: 68,
  },
  {
    id: 'l-gym-04',
    name: 'FitLine CrossFit Box',
    category: 'gyms',
    description:
      'No-nonsense CrossFit box with a tight-knit community feel. Coaches correct form closely, great for people newer to strength training.',
    location: 'Andheri East',
    rating: 4.4,
    recommendation_count: 57,
  },
  {
    id: 'l-salon-01',
    name: 'Enrich Salon & Spa',
    category: 'salons',
    description:
      'Reliable mid-range salon for haircuts, colour, and spa services. Consistent quality across stylists — easy to book last minute.',
    location: 'Lokhandwala',
    rating: 4.3,
    recommendation_count: 112,
  },
  {
    id: 'l-salon-02',
    name: 'Looks Salon',
    category: 'salons',
    description:
      'Popular chain outlet, good for quick trims and threading. Can get busy on weekends so booking ahead is recommended.',
    location: 'Andheri West',
    rating: 4.1,
    recommendation_count: 94,
  },
  {
    id: 'l-salon-03',
    name: 'Naturals Salon',
    category: 'salons',
    description:
      'Neighbourhood favourite for affordable haircuts and facials. Friendly staff, no-frills interiors, consistently good value.',
    location: 'Versova',
    rating: 4.2,
    recommendation_count: 77,
  },
  {
    id: 'l-salon-04',
    name: 'The Grooming Lounge',
    category: 'salons',
    description:
      "Men's grooming studio specialising in beard styling and hot towel shaves. Appointment-only, worth booking a week ahead.",
    location: 'Four Bungalows',
    rating: 4.6,
    recommendation_count: 49,
  },
  {
    id: 'l-doc-01',
    name: "Dr. Mehta's Family Clinic",
    category: 'doctors',
    description:
      'General physician known for unhurried consultations and clear follow-up advice. Walk-ins accepted most mornings.',
    location: 'Andheri West',
    rating: 4.8,
    recommendation_count: 96,
  },
  {
    id: 'l-doc-02',
    name: 'Andheri Dental Care',
    category: 'doctors',
    description:
      'Well-reviewed dental clinic for routine cleaning and minor procedures. Transparent pricing quoted upfront before treatment.',
    location: 'Lokhandwala',
    rating: 4.5,
    recommendation_count: 71,
  },
  {
    id: 'l-doc-03',
    name: 'Lilavati Diagnostic Centre',
    category: 'doctors',
    description:
      'Reliable diagnostic lab for routine blood work and imaging. Reports are usually ready within 24 hours, staff are efficient.',
    location: 'Oshiwara',
    rating: 4.4,
    recommendation_count: 58,
  },
  {
    id: 'l-doc-04',
    name: 'Horizon Physiotherapy',
    category: 'doctors',
    description:
      'Physiotherapy clinic good for sports injuries and post-surgery rehab. Therapists build a proper long-term recovery plan rather than one-off sessions.',
    location: 'Andheri East',
    rating: 4.6,
    recommendation_count: 42,
  },
  {
    id: 'l-grocery-01',
    name: "Nature's Basket",
    category: 'grocery',
    description:
      'Well-stocked premium grocery store with a good imported and organic section. Pricier than a kirana store but reliably has hard-to-find items.',
    location: 'Lokhandwala',
    rating: 4.3,
    recommendation_count: 88,
  },
  {
    id: 'l-grocery-02',
    name: '24 Seven Grocers',
    category: 'grocery',
    description:
      'Convenient late-night grocery store for daily essentials. Smaller aisles but open when most other stores are closed.',
    location: 'Andheri West',
    rating: 4.0,
    recommendation_count: 63,
  },
  {
    id: 'l-grocery-03',
    name: 'Reliance Fresh',
    category: 'grocery',
    description:
      'Standard supermarket chain for weekly grocery runs. Decent produce section, occasional long billing queues on weekends.',
    location: 'Andheri East',
    rating: 3.9,
    recommendation_count: 74,
  },
  {
    id: 'l-grocery-04',
    name: 'Kirana Corner Mart',
    category: 'grocery',
    description:
      'Old-school local kirana store with a surprisingly wide range and fast home delivery. The owner remembers regulars by name.',
    location: 'Four Bungalows',
    rating: 4.5,
    recommendation_count: 39,
  },
  {
    id: 'l-service-01',
    name: 'Urban Company Home Repairs',
    category: 'services',
    description:
      'On-demand electricians, plumbers, and appliance repair technicians. Booking is quick and technicians generally arrive within the given slot.',
    location: 'Serves Andheri & nearby',
    rating: 4.3,
    recommendation_count: 156,
  },
  {
    id: 'l-service-02',
    name: 'Speedy Dry Clean',
    category: 'services',
    description:
      'Same-day dry cleaning and ironing service with free pickup and drop. Consistent quality on formal wear and sarees.',
    location: 'Andheri West',
    rating: 4.4,
    recommendation_count: 67,
  },
  {
    id: 'l-service-03',
    name: 'QuickFix Electricians',
    category: 'services',
    description:
      'Local electrician collective for wiring and appliance installation jobs. Fair, upfront quotes and no unnecessary upselling.',
    location: 'Oshiwara',
    rating: 4.5,
    recommendation_count: 45,
  },
  {
    id: 'l-service-04',
    name: 'PetCare Home Grooming',
    category: 'services',
    description:
      'Mobile pet grooming service that comes to your home. Gentle with anxious pets, and easy to schedule recurring visits.',
    location: 'Serves Andheri & nearby',
    rating: 4.7,
    recommendation_count: 34,
  },
]

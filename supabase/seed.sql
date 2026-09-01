-- Realistic sample listings for Neighbourhood (Andheri, Mumbai).
-- Generated from src/data/seedListings.js — run after supabase/schema.sql.

insert into public.listings (id, name, category, description, location, rating, recommendation_count)
values
  ('l-cafe-01', 'Subko Coffee Roasters', 'cafes', 'Specialty coffee roastery with a bright, plant-filled seating area. Great filter coffee, reliable wifi, and quiet corners that make it a favourite for remote work.', 'Yari Road, Versova', 4.7, 132),
  ('l-cafe-02', 'Third Wave Coffee', 'cafes', 'Bright, laptop-friendly cafe with strong cold brews and a rotating pastry counter. Gets busy after 6pm, mornings are ideal for focused work.', 'Lokhandwala Complex', 4.4, 98),
  ('l-cafe-03', 'The Baker''s Dozen', 'cafes', 'Neighbourhood bakery-cafe known for sourdough and small-batch cakes. Limited seating but worth it for the almond croissants alone.', 'Oshiwara', 4.6, 76),
  ('l-cafe-04', 'Prithvi Cafe', 'cafes', 'Cozy, no-frills cafe attached to the theatre — old-school charm, cheap filter coffee, and a great spot to people-watch between shows.', 'Juhu-Andheri Link Rd', 4.3, 54),
  ('l-rest-01', 'Swati Snacks', 'restaurants', 'Long-running Gujarati-Kathiawadi spot loved for panki chatni and their handvo. Expect a short wait on weekends, always worth it.', 'Andheri West', 4.8, 210),
  ('l-rest-02', 'Bastian Air Bar', 'restaurants', 'Lively seafood-forward menu with a rooftop bar. Better for a weekend dinner out than a quick weekday meal — book ahead.', 'Versova', 4.5, 187),
  ('l-rest-03', 'Pali Village Cafe', 'restaurants', 'All-day dining spot with a relaxed patio. Solid brunch menu and a good middle-ground for group meals with mixed dietary preferences.', 'Yari Road', 4.4, 143),
  ('l-rest-04', 'Kokum Curry House', 'restaurants', 'Homestyle Malvani thalis and fresh seafood curries. Small, family-run place — go early for lunch, it fills up fast.', 'Four Bungalows', 4.6, 89),
  ('l-gym-01', 'Cult.fit Andheri West', 'gyms', 'Well-equipped functional training gym with group classes throughout the day. Clean, well-maintained, and easy to drop into for a single class.', 'Andheri West', 4.5, 164),
  ('l-gym-02', 'Gold''s Gym Lokhandwala', 'gyms', 'Large strength-training floor with a solid range of free weights. Peak hours (7-9pm) get crowded — mornings are much quieter.', 'Lokhandwala', 4.3, 121),
  ('l-gym-03', 'The Yoga Studio', 'gyms', 'Small-group Hatha and Vinyasa classes in a calm, no-mirrors studio. Instructors are attentive to beginners — a nice alternative to a big gym.', 'Oshiwara', 4.7, 68),
  ('l-gym-04', 'FitLine CrossFit Box', 'gyms', 'No-nonsense CrossFit box with a tight-knit community feel. Coaches correct form closely, great for people newer to strength training.', 'Andheri East', 4.4, 57),
  ('l-salon-01', 'Enrich Salon & Spa', 'salons', 'Reliable mid-range salon for haircuts, colour, and spa services. Consistent quality across stylists — easy to book last minute.', 'Lokhandwala', 4.3, 112),
  ('l-salon-02', 'Looks Salon', 'salons', 'Popular chain outlet, good for quick trims and threading. Can get busy on weekends so booking ahead is recommended.', 'Andheri West', 4.1, 94),
  ('l-salon-03', 'Naturals Salon', 'salons', 'Neighbourhood favourite for affordable haircuts and facials. Friendly staff, no-frills interiors, consistently good value.', 'Versova', 4.2, 77),
  ('l-salon-04', 'The Grooming Lounge', 'salons', 'Men''s grooming studio specialising in beard styling and hot towel shaves. Appointment-only, worth booking a week ahead.', 'Four Bungalows', 4.6, 49),
  ('l-doc-01', 'Dr. Mehta''s Family Clinic', 'doctors', 'General physician known for unhurried consultations and clear follow-up advice. Walk-ins accepted most mornings.', 'Andheri West', 4.8, 96),
  ('l-doc-02', 'Andheri Dental Care', 'doctors', 'Well-reviewed dental clinic for routine cleaning and minor procedures. Transparent pricing quoted upfront before treatment.', 'Lokhandwala', 4.5, 71),
  ('l-doc-03', 'Lilavati Diagnostic Centre', 'doctors', 'Reliable diagnostic lab for routine blood work and imaging. Reports are usually ready within 24 hours, staff are efficient.', 'Oshiwara', 4.4, 58),
  ('l-doc-04', 'Horizon Physiotherapy', 'doctors', 'Physiotherapy clinic good for sports injuries and post-surgery rehab. Therapists build a proper long-term recovery plan rather than one-off sessions.', 'Andheri East', 4.6, 42),
  ('l-grocery-01', 'Nature''s Basket', 'grocery', 'Well-stocked premium grocery store with a good imported and organic section. Pricier than a kirana store but reliably has hard-to-find items.', 'Lokhandwala', 4.3, 88),
  ('l-grocery-02', '24 Seven Grocers', 'grocery', 'Convenient late-night grocery store for daily essentials. Smaller aisles but open when most other stores are closed.', 'Andheri West', 4, 63),
  ('l-grocery-03', 'Reliance Fresh', 'grocery', 'Standard supermarket chain for weekly grocery runs. Decent produce section, occasional long billing queues on weekends.', 'Andheri East', 3.9, 74),
  ('l-grocery-04', 'Kirana Corner Mart', 'grocery', 'Old-school local kirana store with a surprisingly wide range and fast home delivery. The owner remembers regulars by name.', 'Four Bungalows', 4.5, 39),
  ('l-service-01', 'Urban Company Home Repairs', 'services', 'On-demand electricians, plumbers, and appliance repair technicians. Booking is quick and technicians generally arrive within the given slot.', 'Serves Andheri & nearby', 4.3, 156),
  ('l-service-02', 'Speedy Dry Clean', 'services', 'Same-day dry cleaning and ironing service with free pickup and drop. Consistent quality on formal wear and sarees.', 'Andheri West', 4.4, 67),
  ('l-service-03', 'QuickFix Electricians', 'services', 'Local electrician collective for wiring and appliance installation jobs. Fair, upfront quotes and no unnecessary upselling.', 'Oshiwara', 4.5, 45),
  ('l-service-04', 'PetCare Home Grooming', 'services', 'Mobile pet grooming service that comes to your home. Gentle with anxious pets, and easy to schedule recurring visits.', 'Serves Andheri & nearby', 4.7, 34)
on conflict (id) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  location = excluded.location,
  rating = excluded.rating,
  recommendation_count = excluded.recommendation_count;


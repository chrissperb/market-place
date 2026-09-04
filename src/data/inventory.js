export const CATEGORIES = [
  'boat',
  'jetski',
  'kayak',
  'sup',
  'surfboard',
  'waverunner',
  'fishing',
  'offers',
]

export const CATEGORY_LABELS = {
  boat: 'Boats',
  jetski: 'Jet Ski',
  kayak: 'Kayaks',
  sup: 'Stand-Up Paddle',
  surfboard: 'Surfboards',
  waverunner: 'Waverunners',
  fishing: 'Fishing Gear',
  offers: 'Offers',
}

const inventory = [
  {
    id: 'boat-01',
    name: 'Sunseeker 40ft Cruiser',
    category: 'boat',
    pricePerHour: 320,
    deposit: 1000,
    stock: 2,
    rating: 4.8,
    location: 'Marina Bay',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=60',
    description:
      'Luxury 40ft motor cruiser with cabin, seating for 12 and a full galley. Ideal for day charters, parties and coastal cruising along the bay.',
  },
  {
    id: 'boat-02',
    name: 'Classic Sailboat 28ft',
    category: 'boat',
    pricePerHour: 145,
    deposit: 800,
    stock: 3,
    rating: 4.6,
    location: 'Harbor West',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=60',
    description:
      'Authentic 28ft sloop with serene sailing lines. Perfect for small groups and sunset cruises, equipped with a small cockpit cabin.',
  },
  {
    id: 'jetski-01',
    name: 'Sea-Doo GTX 300',
    category: 'jetski',
    pricePerHour: 110,
    deposit: 500,
    stock: 5,
    rating: 4.9,
    location: 'Marina Bay',
    image:
      'https://images.unsplash.com/photo-1747276935677-76a4745182bb?auto=format&fit=crop&w=900&q=60',
    description:
      'High-performance personal watercraft with 300hp engine, GPS navigation and plenty of storage. Book by the hour for bay-side thrills.',
  },
  {
    id: 'jetski-02',
    name: 'Kawasaki Ultra LX',
    category: 'jetski',
    pricePerHour: 95,
    deposit: 400,
    stock: 4,
    rating: 4.5,
    location: 'Lagoon Point',
    image:
      'https://images.unsplash.com/photo-1769528512909-6716745c3d17?auto=format&fit=crop&w=900&q=60',
    description:
      'Comfortable two-seat jet ski with smooth handling. Great for learners and relaxed rides across the lagoon.',
  },
  {
    id: 'waverunner-01',
    name: 'Yamaha VX Waverunner',
    category: 'waverunner',
    pricePerHour: 105,
    deposit: 450,
    stock: 3,
    rating: 4.7,
    location: 'North Docks',
    image:
      'https://images.unsplash.com/photo-1507876466758-bc54f384809c?auto=format&fit=crop&w=900&q=60',
    description:
      'Versatile three-seat waverunner with a roomy deck. A favourite for family outings and long coastal rides.',
  },
  {
    id: 'kayak-01',
    name: 'Tandem Touring Kayak',
    category: 'kayak',
    pricePerHour: 22,
    deposit: 100,
    stock: 8,
    rating: 4.4,
    location: 'Lagoon Point',
    image:
      'https://images.unsplash.com/photo-1647036003492-a74531750323?auto=format&fit=crop&w=900&q=60',
    description:
      'Stable two-person touring kayak with dry storage hatches. Ideal for paddling along the sheltered shoreline.',
  },
  {
    id: 'kayak-02',
    name: 'Single Sit-On-Top Kayak',
    category: 'kayak',
    pricePerHour: 16,
    deposit: 60,
    stock: 10,
    rating: 4.2,
    location: 'South Beach',
    image:
      'https://images.unsplash.com/photo-1668415871162-4590ba735237?auto=format&fit=crop&w=900&q=60',
    description:
      'Easy-to-use solo kayak that is nearly impossible to tip. Self-draining deck and adjustable footrests.',
  },
  {
    id: 'sup-01',
    name: 'Inflatable SUP Board',
    category: 'sup',
    pricePerHour: 18,
    deposit: 80,
    stock: 12,
    rating: 4.3,
    location: 'South Beach',
    image:
      'https://images.unsplash.com/photo-1754212853626-7210fe0342a7?auto=format&fit=crop&w=900&q=60',
    description:
      'Lightweight inflatable paddle board with pump and leash included. Perfect for a calm morning glide on the flat water.',
  },
  {
    id: 'surfboard-01',
    name: 'Shortboard 5\'10"',
    category: 'surfboard',
    pricePerHour: 20,
    deposit: 150,
    stock: 6,
    rating: 4.6,
    location: 'Point Break',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=60',
    description:
      'Agile performance shortboard for intermediate to advanced surfers chasing the swells off Point Break.',
  },
  {
    id: 'surfboard-02',
    name: 'Soft-Top Learner Board 8\' ',
    category: 'surfboard',
    pricePerHour: 15,
    deposit: 100,
    stock: 9,
    rating: 4.7,
    location: 'Point Break',
    image:
      'https://images.unsplash.com/photo-1709408925583-a3c0e25b3a51?auto=format&fit=crop&w=900&q=60',
    description:
      'Forgiving 8ft soft-top board with triple fins. The go-to choice for first-time surfers and lessons.',
  },
  {
    id: 'fishing-01',
    name: 'Deep Sea Rod Set',
    category: 'fishing',
    pricePerHour: 28,
    deposit: 200,
    stock: 7,
    rating: 4.5,
    location: 'North Docks',
    image:
      'https://images.unsplash.com/photo-1716984313065-977c85f8cdb2?auto=format&fit=crop&w=900&q=60',
    description:
      'Heavy-duty deep sea rod and reel combo, pre-rigged with line and tackle. Charter-grade gear for offshore expeditions.',
  },
  {
    id: 'fishing-02',
    name: 'Casting Kayak + Rod',
    category: 'fishing',
    pricePerHour: 36,
    deposit: 180,
    stock: 4,
    rating: 4.4,
    location: 'Lagoon Point',
    image:
      'https://images.unsplash.com/photo-1708748978230-510e06b24530?auto=format&fit=crop&w=900&q=60',
    description:
      'Fishing kayak bundle with rod holders and a casting combo. Head out to the flats for an afternoon of light tackle action.',
  },
  {
    id: 'ppe-01',
    name: 'Life Jacket (Adult)',
    category: 'offers',
    soldBy: 'unit',
    price: 39,
    compareAt: 55,
    stock: 15,
    rating: 4.6,
    location: 'Marina Bay',
    image:
      'https://images.unsplash.com/photo-1777891733988-540ac2abbd40?auto=format&fit=crop&w=900&q=60',
    description:
      'USCG-approved adult life vest with adjustable straps. Buy your own for a perfect fit on every outing.',
  },
  {
    id: 'ppd-01',
    name: 'Dry Bag 20L',
    category: 'offers',
    soldBy: 'unit',
    price: 24,
    compareAt: 40,
    stock: 20,
    rating: 4.5,
    location: 'South Beach',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=60',
    description:
      'Waterproof roll-top dry bag for phones, keys and valuables. Keeps your gear safe on the water.',
  },
  {
    id: 'surf-01',
    name: 'Surfboard Leash (6ft)',
    category: 'offers',
    soldBy: 'unit',
    price: 18,
    compareAt: 30,
    stock: 12,
    rating: 4.4,
    location: 'Point Break',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=900&q=60',
    description:
      'Reliable ankle leash with a quick-release strap. Essential board safety gear for any surfer.',
  },
]

export default inventory

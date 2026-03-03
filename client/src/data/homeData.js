const chefImages = import.meta.glob('../assets/chefs/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default'
})

const cuisineImages = import.meta.glob('../assets/cuisine/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default'
})

const occasionImages = import.meta.glob('../assets/occasions/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default'
})

export const heroSlides = [
  {
    id: 1,
    tag: 'Banquet & Venue',
    title: 'Destination',
    titleAccent: 'Venues',
    subtitle: 'Luxurious banquet halls & outdoor venues for weddings, corporate galas & grand celebrations.',
    rating: 4.9,
    reviews: 1012,
    image: 'https://images.pexels.com/photos/34079355/pexels-photo-34079355.jpeg',
    link: '#',
  },
  {
    id: 2,
    tag: 'Halwai at Home',
    title: 'Expert Chefs',
    titleAccent: 'At Your Door',
    subtitle: 'Verified halwais & professional chefs for any occasion — from pooja to full-scale weddings.',
    rating: 4.5,
    reviews: 1440,
    image: 'https://images.pexels.com/photos/17294714/pexels-photo-17294714.jpeg',
    link: '#',
  },
  {
    id: 3,
    tag: 'Catering Services',
    title: 'Authentic',
    titleAccent: 'Indian Cuisine',
    subtitle: 'From North Indian thalis to Continental spreads — curated menus for 15+ occasion types.',
    rating: 4.9,
    reviews: 1012,
    image: 'https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg',
    link: '#',
  },
  {
    id: 4,
    tag: 'Celebrations',
    title: 'Unforgettable',
    titleAccent: 'Celebrations',
    subtitle: 'Birthday parties, anniversaries, house parties — every event deserves a perfect spread.',
    rating: 4.9,
    reviews: 1012,
    image: 'https://images.pexels.com/photos/30844787/pexels-photo-30844787.jpeg',
    link: '#',
  },
];

export const stats = [
  { value: '10,000+', label: 'Happy Families', icon: '❤️' },
  { value: '15+', label: 'Cities Served', icon: '📍' },
  { value: '4.9', label: 'Google Rating', icon: '⭐' },
  { value: '99%', label: 'Success Rate', icon: '✅' },
];

export const occasions = [
  { id: 1, name: 'Wedding Functions', price: '₹799', image: occasionImages['../assets/occasions/wedding_functions.jpg'], link: '#', featured: true },
  { id: 2, name: 'Cocktail & Sangeet', price: '₹899', image: occasionImages['../assets/occasions/cocktail_sangeet.jpg'], link: '#', featured: true },
  { id: 3, name: 'Birthday Party', price: '₹499', image: occasionImages['../assets/occasions/birthday_party.jpg'], link: '#' },
  { id: 4, name: 'Gala Evening', price: '₹799', image: occasionImages['../assets/occasions/gala_evening.jpg'], link: '#' },
  { id: 5, name: 'High Tea Menu', price: '₹599', image: occasionImages['../assets/occasions/high_tea_menu.jpg'], link: '#' },
  { id: 6, name: 'Corporate Event', price: '₹799', image: occasionImages['../assets/occasions/corporate_event.jpg'], link: '#' },
  { id: 7, name: 'Roka Ceremony', price: '₹799', image: occasionImages['../assets/occasions/roka_ceremony.jpg'], link: '#' },
  { id: 8, name: 'Pooja at Home', price: '₹149', image: occasionImages['../assets/occasions/pooja_at_home.jpg'], link: '#' },
  { id: 9, name: 'Mehendi Cocktail', price: '₹599', image: occasionImages['../assets/occasions/mehendi_cocktail.jpg'], link: '#' },
  { id: 10, name: 'Kids Party', price: '₹799', image: occasionImages['../assets/occasions/kids_party.jpg'], link: '#' },
  { id: 11, name: 'House Party', price: '₹799', image: occasionImages['../assets/occasions/house_party.jpg'], link: '#' },
  { id: 12, name: 'Royal Lunch', price: '₹799', image: occasionImages['../assets/occasions/royal_lunch.jpg'], link: '#' },
  { id: 13, name: 'Bachelor Party', price: '₹799', image: occasionImages['../assets/occasions/bachelor_party.jpg'], link: '#' },
  { id: 14, name: 'No Onion No Garlic', price: '₹299', image: occasionImages['../assets/occasions/no_onion_no_garlic.jpg'], link: '#' },
  { id: 15, name: 'Anniversary', price: '₹799', image: occasionImages['../assets/occasions/anniversary.jpg'], link: '#' },
  { id: 16, name: 'Baby Shower', price: '₹799', image: occasionImages['../assets/occasions/baby_shower.png'], link: '#' },
  { id: 17, name: 'Continental Food', price: '₹799', image: occasionImages['../assets/occasions/continental_food.jpg'], link: '#' },
  { id: 18, name: 'Other Occasion', price: '₹199', image: occasionImages['../assets/occasions/other_occasion.jpg'], link: '#' },
];

export const professionals = [
  {
    id: 1,
    name: 'Om Prakash',
    role: 'Master Halwai',
    rating: 4.3,
    events: 120,
    image: chefImages['../assets/chefs/om_prakash.jpg'],
    link: '#'
  },
  {
    id: 2,
    name: 'Pankaj Kumar',
    role: 'Executive Chef',
    rating: 5.0,
    events: 250,
    image: chefImages['../assets/chefs/pankaj_kumar.jpg'],
    link: '#'
  },
  {
    id: 3,
    name: 'Pankaj Garola',
    role: 'Senior Chef',
    rating: 4.9,
    events: 180,
    image: chefImages['../assets/chefs/pankaj_garola.jpg'],
    link: '#'
  },
  {
    id: 4,
    name: 'Shanker Kothiyal',
    role: 'Halwai Expert',
    rating: 5.0,
    events: 310,
    image: chefImages['../assets/chefs/shanker_kothiyal.jpg'],
    link: '#'
  },
  {
    id: 5,
    name: 'Subhash',
    role: 'Catering Head',
    rating: 4.7,
    events: 95,
    image: chefImages['../assets/chefs/subhash.jpeg'],
    link: '#'
  },
  {
    id: 6,
    name: 'Ram Krishnan',
    role: 'Pastry Chef',
    rating: 4.8,
    events: 140,
    image: chefImages['../assets/chefs/ram_krishnan.jpeg'],
    link: '#'
  },
]

export const cuisines = [
  { id: 1, name: 'South Indian', image: cuisineImages['../assets/cuisine/south_indian.jpg'] },
  { id: 2, name: 'North Indian', image: cuisineImages['../assets/cuisine/north_indian.jpg'] },
  { id: 3, name: 'Indo-Chinese', image: cuisineImages['../assets/cuisine/indo_chinese.jpg'] },
  { id: 4, name: 'BBQ & Grills', image: cuisineImages['../assets/cuisine/bbq_grills.jpg'] },
  { id: 5, name: 'Breakfast', image: cuisineImages['../assets/cuisine/breakfast.jpg'] },
  { id: 6, name: 'Sweets & Mithai', image: cuisineImages['../assets/cuisine/sweets_mithai.jpg'] },
  { id: 7, name: 'Soups & Beverages', image: cuisineImages['../assets/cuisine/soups_beverages.jpg'] },
  { id: 8, name: 'Starters', image: cuisineImages['../assets/cuisine/starters.jpg'] },
  { id: 9, name: 'Breads & Rice', image: cuisineImages['../assets/cuisine/breads_rice.jpg'] },
];

// Real Google reviews — reviewer profile URLs sourced directly from Google Maps
export const testimonials = [
  {
    id: 1,
    name: 'Khushboo Rathore',
    handle: '@KhushbooRathore',
    text: 'They handled everything for my dad\'s birthday. Real desi flavors. Definitely the best halwai near me.',
    time: '7 months ago',
    rating: 5,
    avatar: 'https://i.pravatar.cc/60?u=khushboorathore',
    reviewUrl: 'https://www.google.com/maps/contrib/107046883221419897588/reviews',
  },
  {
    id: 2,
    name: 'Parmanand Tiwari',
    handle: '@parmanandtiwari',
    text: 'The Famous Halwai is one of the best caterers till date. Choose them for my brother\'s wedding, they won our hearts. Owner\'s behaviour felt very good. I highly recommend.',
    time: '2 years ago',
    rating: 5,
    avatar: 'https://i.pravatar.cc/60?u=parmanandtiwari',
    reviewUrl: 'https://www.google.com/maps/contrib/108611199157090318415/reviews',
  },
  {
    id: 3,
    name: 'Shankar Khau',
    handle: '@ShankarKhau',
    text: 'The Famous Halwai is the best catering service provider. The food is homecooked, light on stomach, not oily or extra-spicy and very tasty indeed. Also nicely packed and always delivered on time.',
    time: '2 years ago',
    rating: 5,
    avatar: 'https://i.pravatar.cc/60?u=shankarkhau',
    reviewUrl: 'https://www.google.com/maps/contrib/107794094124117932002/reviews',
  },
  {
    id: 4,
    name: 'Atita Nand Dubey',
    handle: '@atiitanandubey',
    text: 'Overall experience is good. The taste buds of each person are different so the cook should understand the family\'s nativity & culture before cooking. Cook Om Prakash was very good at his job.',
    time: '2 years ago',
    rating: 5,
    avatar: 'https://i.pravatar.cc/60?u=atiitanandubey',
    reviewUrl: 'https://www.google.com/maps/contrib/113966959628103745504/reviews',
  },
  {
    id: 5,
    name: 'Anil Gupta',
    handle: '@AnilGupta',
    text: 'Thankyou for being able to take up orders in just 4 to 5 days and delivering on time. I first tried them at my house warming party — the food was without onion garlic and exceeded my expectations.',
    time: '3 years ago',
    rating: 5,
    avatar: 'https://i.pravatar.cc/60?u=anilgupta',
    reviewUrl: 'https://www.google.com/maps/contrib/111260680933857234234/reviews',
  },
  {
    id: 6,
    name: 'Usman Khan',
    handle: '@usmankhan',
    text: 'This food is amazing. Our wedding was almost 1 month ago now and people are still raving about the food! So many great food options and the price is right!! Absolutely recommend.',
    time: '6 years ago',
    rating: 5,
    avatar: 'https://i.pravatar.cc/60?u=usmankhan',
    reviewUrl: 'https://www.google.com/maps/contrib/108038519077786394207/reviews',
  },
];

export const cities = [
  { id: 1, name: 'Delhi NCR', image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg', link: '#' },
  { id: 2, name: 'Dehradun', image: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg', link: '#' },
  { id: 3, name: 'Haridwar', image: 'https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg', link: '#' },
  { id: 4, name: 'Lucknow', image: 'https://images.pexels.com/photos/17223838/pexels-photo-17223838.jpeg', link: '#' },
  { id: 5, name: 'Jaipur', image: 'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg', link: '#' },
  { id: 6, name: 'Noida', image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg', link: '#' },
  { id: 7, name: 'Gurugram', image: 'https://images.pexels.com/photos/4614200/pexels-photo-4614200.jpeg', link: '#' },
  { id: 8, name: 'Chandigarh', image: 'https://images.pexels.com/photos/2087391/pexels-photo-2087391.jpeg', link: '#' },
  { id: 9, name: 'Agra', image: 'https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg', link: '#' },
  { id: 10, name: 'Kolkata', image: 'https://images.pexels.com/photos/1538177/pexels-photo-1538177.jpeg', link: '#' },
];

export const navOccasions = [
  'Cocktail & Sangeet', 'Gala Evening', 'High Tea Menu', 'No Onion No Garlic',
  'Continental Food', 'Royal Lunch', 'Roka Ceremony', 'Pooja at Home',
  'Mehendi Cocktail', 'Kids Party', 'House Party', 'Corporate Event',
  'Bachelor Party', 'Wedding Functions', 'Birthday Party', 'Anniversary',
  'Baby Shower', 'Other Occasion',
];

export const steps = [
  { id: 1, icon: '🔍', title: 'Choose the Service', description: 'Browse occasions, cuisines, and halwai packages tailored to your event.', color: '#C1272D' },
  { id: 2, icon: '📋', title: 'Share your Needs', description: 'Tell us your guest count, preferences, date and special dietary requirements.', color: '#DA9100' },
  { id: 3, icon: '🎉', title: 'Sit Back & Enjoy!', description: 'Our verified professionals handle everything — from setup to cleanup.', color: '#16a34a' },
];

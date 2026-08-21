import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Flour (Fine Chakki)',
    slug: 'premium-flour-fine-chakki',
    category: 'Flour & Atta',
    categorySlug: 'flour',
    price: 1450,
    originalPrice: 1650,
    discountPercent: 12,
    rating: 4.9,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Freshly ground 100% pure wheat chakki flour with natural bran and nutrients intact for softest rotis.',
    detailedDescription: 'Pure Harvest Premium Flour (Fine Chakki) is slow-milled from hand-selected, triple-cleaned premium Punjab wheat grains. It produces remarkably soft, aromatic, and puffy rotis packed with natural vitamins, minerals, and dietary fiber.\n\nContains zero preservatives, bleaching agents, or added maida.',
    netWeight: '10 kg',
    origin: 'Punjab, Pakistan',
    inStock: true,
    bestseller: true,
    isOrganic: true,
    benefits: [
      '100% Traditional Chakki Fresh',
      'Ultra Soft & Fluffy Rotis',
      'Rich in Dietary Fiber',
      'Zero Bleaching Agents & Maida',
      'Naturally Preserved Bran',
      'Retains Natural Wheat Aroma'
    ],
    ingredients: '100% Premium Selected Whole Wheat Grains.',
    howToUse: 'Knead with lukewarm water, let rest for 15 minutes, and cook on medium-high tawa for delicious rotis and parathas.',
    tags: ['flour', 'chakki', 'atta', 'bestseller', 'wheat']
  },
  {
    id: '2',
    name: 'Premium Daal (Organic Washed)',
    slug: 'premium-daal-organic-washed',
    category: 'Grains & Pulses',
    categorySlug: 'pulses',
    price: 780,
    originalPrice: 890,
    discountPercent: 12,
    rating: 4.8,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Triple-cleaned, unpolished organic washed lentils loaded with plant protein, natural aroma, and rich taste.',
    detailedDescription: 'Sourced directly from organic certified farms, our Premium Daal is washed, dried under clean conditions, and unpolished to retain natural nutrients, texture, and authentic culinary flavour.\n\nQuick to cook with authentic homemade aroma.',
    netWeight: '1 kg',
    origin: 'Organic Farms, Pakistan',
    inStock: true,
    bestseller: true,
    isOrganic: true,
    benefits: [
      'High Plant Protein & Iron',
      'Triple-Cleaned & Washed',
      '100% Unpolished & Natural',
      'Easy to Digest & Light',
      'Rich Authentic Taste & Aroma',
      'Zero Artificial Polish or Colors'
    ],
    ingredients: '100% Organic Washed Pulses (Triple Cleaned).',
    howToUse: 'Rinse gently, boil with turmeric and salt until tender, and temper with desi ghee, cumin, and garlic tarka.',
    tags: ['daal', 'pulses', 'organic', 'protein', 'lentils']
  },
  {
    id: '3',
    name: 'Stone Ground Atta (Whole Grain)',
    slug: 'stone-ground-atta-whole-grain',
    category: 'Flour & Atta',
    categorySlug: 'flour',
    price: 1550,
    originalPrice: 1750,
    discountPercent: 11,
    rating: 5.0,
    reviewsCount: 176,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cold stone-milled whole grain wheat flour with complete germ, bran, and endosperm for wholesome nutrition.',
    detailedDescription: 'Ground on traditional stone mills at low RPM to ensure that heat does not destroy the delicate vitamins, minerals, and enzymes present in the wheat germ. Perfect for diabetics and health-conscious families.',
    netWeight: '10 kg',
    origin: 'Punjab, Pakistan',
    inStock: true,
    bestseller: true,
    isOrganic: true,
    benefits: [
      'Low Heat Cold Stone Milled',
      'Full Wheat Germ & High Fiber',
      'Low Glycemic Index (GI)',
      'Aids Healthy Digestion & Gut',
      '100% Unadulterated & Pure',
      'No Additives or Preservatives'
    ],
    ingredients: '100% Certified Whole Grain Wheat (Pesticide-Free).',
    howToUse: 'Knead gently with warm water, let rest for 20 minutes for maximum tenderness and digestive ease.',
    tags: ['stoneground', 'wholegrain', 'atta', 'fiber', 'healthy']
  },
  {
    id: '4',
    name: 'Dessi Ghee',
    slug: 'dessi-ghee',
    category: 'Organic Ghee & Dairy',
    categorySlug: 'ghee',
    price: 2850,
    originalPrice: 3200,
    discountPercent: 11,
    rating: 5.0,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Traditional slow-cooked bilona clarified butter with rich granular (danedar) texture and unforgettable aroma.',
    detailedDescription: 'Prepared using traditional slow-cooking methods from fresh grass-fed farm milk. Our Dessi Ghee is rich in fat-soluble vitamins (A, D, E, K), butyric acid for gut health, and aromatic golden goodness that elevates every Pakistani dish.',
    netWeight: '1 kg (1000ml)',
    origin: 'Rural Farmsteads, Pakistan',
    inStock: true,
    bestseller: true,
    isOrganic: true,
    benefits: [
      '100% Pure Grass-Fed Dairy',
      'Traditional Danedar Texture',
      'Rich in Butyric Acid & Omega-3',
      'High Smoke Point for Cooking',
      'Boosts Immunity & Energy',
      'Zero Palm Oil or Chemicals'
    ],
    ingredients: '100% Pure Clarified Butter (Desi Makhan).',
    howToUse: 'Drizzle over hot rotis, use for authentic tarka, cook rich curries, or enjoy with warm milk and halwa.',
    tags: ['ghee', 'dessi-ghee', 'danedar', 'dairy', 'organic', 'bestseller']
  },
  {
    id: '5',
    name: 'Premium White Wheat Flour',
    slug: 'premium-white-wheat-flour',
    category: 'Flour & Atta',
    categorySlug: 'flour',
    price: 1350,
    originalPrice: 1500,
    discountPercent: 10,
    rating: 4.8,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Superfine, silky white wheat flour specially ground for fluffy naans, puris, parathas, and light baking.',
    detailedDescription: 'Selected from golden white wheat grain varieties and sifted to silky perfection without using harmful chemical bleaches or artificial additives. Ideal for traditional flatbreads, crispy parathas, and bakery creations.',
    netWeight: '10 kg',
    origin: 'Punjab, Pakistan',
    inStock: true,
    bestseller: false,
    isOrganic: true,
    benefits: [
      'Naturally Milled White Wheat',
      'Chemical-Free & Unbleached',
      'Ideal for Naan, Puri & Baking',
      'Silky Smooth Texture',
      'Crispy & Flaky Parathas',
      'Fresh Batch Guaranteed'
    ],
    ingredients: '100% Fine Milled White Wheat Grains (Unbleached).',
    howToUse: 'Perfect for dough making, baking organic flatbreads, samosa sheets, and light pastries.',
    tags: ['whiteflour', 'atta', 'wheat', 'baking', 'flour']
  }
];

export const INITIAL_CART_ITEMS = [
  {
    product: PRODUCTS[0], // Premium Flour (Fine Chakki)
    quantity: 1
  },
  {
    product: PRODUCTS[3], // Dessi Ghee
    quantity: 1
  }
];

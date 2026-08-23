import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Desi Wheat Flour',
    slug: 'premium-desi-wheat-flour',
    category: 'Flour & Atta',
    categorySlug: 'flour',
    price: 1000,
    originalPrice: 1150,
    discountPercent: 13,
    unitRate: 'Rs 200/Kg',
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://i.postimg.cc/RCYLNsGp/a89316cd-82f0-455e-8f90-4973a1a0a212.png',
    gallery: [
      'https://i.postimg.cc/RCYLNsGp/a89316cd-82f0-455e-8f90-4973a1a0a212.png'
    ],
    description:
      'Sourced from select desi wheat grains and milled with care to preserve natural characteristics. 100% natural, fresh, and free from preservatives.',
    detailedDescription:
      'Pure Harvest Premium Desi Wheat Flour is positioned around quality, freshness, and careful processing. We source quality wheat and process it to preserve its natural nutrients and distinct aroma, making it the ideal flour for everyday family chapatis and rotis.',
    netWeight: '5 kg / 10 kg',
    origin: 'Punjab, Pakistan',
    inStock: true,
    stockStatus: 'Fresh Milled Daily',
    bestseller: true,
    isOrganic: true,
    benefits: [
      'Freshly milled from high quality Pakistani desi wheat',
      'No chemical bleaching, additives, or synthetic preservatives',
      'High natural fiber and nutrients for easy digestion',
      'Produces exceptionally soft and fragrant rotis'
    ],
    ingredients: '100% Whole Desi Wheat (Triticum aestivum)',
    howToUse: 'Knead with lukewarm water and let rest for 15-20 minutes before rolling soft rotis, parathas, and puris.',
    storageInstructions: 'Store in an airtight container in a cool, dry place away from direct sunlight.',
    deliveryInfo: 'Fresh delivery available exclusively in Islamabad & Rawalpindi within 24-48 hours.',
    shelfLife: '60 Days from Milling Date',
    tags: ['Wheat Flour', 'Desi Atta', 'Fresh Chakki', 'Islamabad', 'Rawalpindi'],
    variants: [
      { size: '5 kg', price: 1000, originalPrice: 1150 },
      { size: '10 kg', price: 2000, originalPrice: 2300 }
    ]
  },
  {
    id: '2',
    name: 'Desi White Wheat Flour',
    slug: 'desi-white-wheat-flour',
    category: 'Flour & Atta',
    categorySlug: 'flour',
    price: 900,
    originalPrice: 1050,
    discountPercent: 14,
    unitRate: 'Rs 180/Kg',
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://i.postimg.cc/NM5bzWpX/5d898bb8-3a3b-48e3-b4e1-ea9d498d174b.png',
    gallery: [
      'https://i.postimg.cc/NM5bzWpX/5d898bb8-3a3b-48e3-b4e1-ea9d498d174b.png'
    ],
    description:
      'Fine desi white wheat flour milled gently for light, fluffy, and tender rotis. Free from chemical bleaches.',
    detailedDescription:
      'Desi White Wheat Flour provides a lighter texture without sacrificing the natural purity of wholesome wheat. Carefully processed to give you soft rotis and puris that stay fresh longer.',
    netWeight: '5 kg / 10 kg',
    origin: 'Punjab, Pakistan',
    inStock: true,
    stockStatus: 'In Stock',
    bestseller: false,
    isOrganic: true,
    benefits: [
      'Naturally light texture without chemical processing',
      'Makes extra soft, light, and delicious chapatis',
      'Carefully sifted and cleaned before packaging',
      'Zero maida adulteration'
    ],
    ingredients: '100% Desi White Wheat',
    howToUse: 'Perfect for light daily rotis, delicate naan, and homestyle bakery snacks.',
    storageInstructions: 'Keep in a tightly closed container in a dry, well-ventilated area.',
    deliveryInfo: 'Fresh delivery available in Islamabad & Rawalpindi.',
    shelfLife: '60 Days from Milling Date',
    tags: ['White Wheat', 'Soft Roti', 'Atta', 'Islamabad Delivery'],
    variants: [
      { size: '5 kg', price: 900, originalPrice: 1050 },
      { size: '10 kg', price: 1800, originalPrice: 2100 }
    ]
  },
  {
    id: '3',
    name: 'Stone Grounded Wheat Flour',
    slug: 'stone-grounded-wheat-flour',
    category: 'Flour & Atta',
    categorySlug: 'flour',
    price: 1150,
    originalPrice: 1300,
    discountPercent: 12,
    unitRate: 'Rs 230/Kg',
    rating: 4.95,
    reviewsCount: 176,
    image: 'https://i.postimg.cc/RF6QRwZh/1bdf141f-fb57-4248-a592-a1910a5c7b4a.png',
    gallery: [
      'https://i.postimg.cc/RF6QRwZh/1bdf141f-fb57-4248-a592-a1910a5c7b4a.png'
    ],
    description:
      'Authentic low-RPM stone-ground wheat flour. Preserves germ, natural bran, vitamins, and minerals for traditional health.',
    detailedDescription:
      'Stone-ground wheat flour is produced by grinding whole wheat using stone milling methods rather than conventional high-speed industrial rollers. This traditional processing helps retain the grain’s natural fiber, germ, and sweet earthy flavor.',
    netWeight: '5 kg / 10 kg',
    origin: 'Rawalpindi / Islamabad Region',
    inStock: true,
    stockStatus: 'Fresh Milled Daily',
    bestseller: true,
    isOrganic: true,
    benefits: [
      'Traditional stone milling preserves wheat germ & oils',
      'Low glycemic response and rich in natural dietary fiber',
      'Authentic aroma and golden color',
      '100% natural, unbleached, and unadulterated'
    ],
    ingredients: '100% Stone-Ground Whole Wheat',
    howToUse: 'Use warm water to knead. Rest for 20 minutes for maximum tenderness and fluffiness.',
    storageInstructions: 'Store in a cool, dry place in an airtight box.',
    deliveryInfo: 'Fast doorstep delivery across Islamabad and Rawalpindi.',
    shelfLife: '60 Days',
    tags: ['Stone Ground', 'Chakki Atta', 'Organic', 'Health', 'Pure Harvest'],
    variants: [
      { size: '5 kg', price: 1150, originalPrice: 1300 },
      { size: '10 kg', price: 2300, originalPrice: 2600 }
    ]
  },
  {
    id: '4',
    name: 'Brown & White Mixed Wheat Flour',
    slug: 'brown-white-mixed-wheat-flour',
    category: 'Flour & Atta',
    categorySlug: 'flour',
    price: 950,
    originalPrice: 1100,
    discountPercent: 14,
    unitRate: 'Rs 190/Kg',
    rating: 4.85,
    reviewsCount: 84,
    image: 'https://i.postimg.cc/Qxb5cfJR/7a0e5c1d-1d96-4c7a-9247-739876624f49.png',
    gallery: [
      'https://i.postimg.cc/Qxb5cfJR/7a0e5c1d-1d96-4c7a-9247-739876624f49.png'
    ],
    description:
      'Harmonious balance of wholesome brown wheat bran and soft white wheat. The ideal combination of health and soft texture.',
    detailedDescription:
      'Our Brown & White Mixed Wheat Flour combines the rich dietary fiber of brown wheat with the softness of white wheat. It provides the perfect balance for families wanting nutritious, fiber-rich rotis that remain soft and easy to roll.',
    netWeight: '5 kg / 10 kg',
    origin: 'Punjab, Pakistan',
    inStock: true,
    stockStatus: 'In Stock',
    bestseller: false,
    isOrganic: true,
    benefits: [
      'Balanced blend of fiber-rich brown bran and soft white grain',
      'Ideal for children and elders needing easy-to-chew nutritious rotis',
      'Naturally stone-milled without chemical additives',
      'Delicious homestyle taste and golden brown color'
    ],
    ingredients: 'Blend of Whole Brown Wheat & Desi White Wheat',
    howToUse: 'Knead with water and a pinch of salt if desired. Yields soft, wholesome chapatis.',
    storageInstructions: 'Keep in an airtight container in a cool, ventilated pantry.',
    deliveryInfo: 'Delivered in Islamabad and Rawalpindi.',
    shelfLife: '60 Days',
    tags: ['Mixed Flour', 'Brown Wheat', 'White Wheat', 'Fiber Rich'],
    variants: [
      { size: '5 kg', price: 950, originalPrice: 1100 },
      { size: '10 kg', price: 1900, originalPrice: 2200 }
    ]
  },
  {
    id: '5',
    name: 'Premium Multigrain Flour',
    slug: 'premium-multigrain-flour',
    category: 'Flour & Atta',
    categorySlug: 'flour',
    price: 2000,
    originalPrice: 2300,
    discountPercent: 13,
    unitRate: 'Rs 400/Kg',
    rating: 4.92,
    reviewsCount: 115,
    image: 'https://i.postimg.cc/wMWqjRDQ/5aa349e1-265e-4016-96cc-d57c412bcd98.png',
    gallery: [
      'https://i.postimg.cc/wMWqjRDQ/5aa349e1-265e-4016-96cc-d57c412bcd98.png'
    ],
    description:
      'Superfood multigrain blend of whole wheat, barley (jau), black chana, oats, and millets for sustained energy and health.',
    detailedDescription:
      'Multigrain flour is made using a wholesome combination of different grains to provide a more varied nutritional profile and flavor compared with conventional wheat flour. Pure Harvest Multigrain Flour is designed for health-conscious individuals and families seeking a premium alternative for everyday baking and cooking.',
    netWeight: '5 kg / 10 kg',
    origin: 'Pakistan',
    inStock: true,
    stockStatus: 'Fresh Milled Daily',
    bestseller: true,
    isOrganic: true,
    benefits: [
      'Rich in complex carbohydrates, plant proteins, and dietary fiber',
      'Helps maintain steady energy levels and supports weight management',
      'Nutrient blend of Wheat, Barley (Jau), Roasted Gram (Chana), Oats, and Millets',
      'Distinctive nutty flavor and wholesome aroma'
    ],
    ingredients: 'Whole Wheat, Barley (Jau), Roasted Gram (Chana), Whole Oats, Millets',
    howToUse: 'Use warm water to knead. Rest dough for 20 minutes before making healthy rotis or multigrain breads.',
    storageInstructions: 'Store in an airtight container in a cool dry area away from heat.',
    deliveryInfo: 'Doorstep delivery across Islamabad & Rawalpindi.',
    shelfLife: '60 Days',
    tags: ['Multigrain', 'Superfood', 'Barley', 'High Protein', 'Diet Friendly'],
    variants: [
      { size: '5 kg', price: 2000, originalPrice: 2300 },
      { size: '10 kg', price: 4000, originalPrice: 4600 }
    ]
  },
  {
    id: '6',
    name: 'Premium Desi Ghee',
    slug: 'premium-desi-ghee',
    category: 'Organic Desi Ghee',
    categorySlug: 'ghee',
    price: 1000,
    originalPrice: 1200,
    discountPercent: 17,
    unitRate: 'Rs 4000/Kg',
    rating: 4.98,
    reviewsCount: 210,
    image: 'https://i.postimg.cc/02xX8HNh/33a473c0-69f6-4a1e-9754-60208cded94a.png',
    gallery: [
      'https://i.postimg.cc/02xX8HNh/33a473c0-69f6-4a1e-9754-60208cded94a.png'
    ],
    description:
      'Pure traditional Desi Ghee prepared with focus on quality and purity. Rich golden aroma and grainy texture.',
    detailedDescription:
      'Pure Harvest Desi Ghee is positioned as a premium Desi Ghee product, sourced and prepared with a focus on quality and purity. We provide customers with authentic-tasting Desi Ghee suitable for traditional Pakistani cooking, baking, halwas, and everyday healthy living.',
    netWeight: '250 gm / 500 gm / 1 kg',
    origin: 'Punjab, Pakistan',
    inStock: true,
    stockStatus: 'Pure & Fresh Batch',
    bestseller: true,
    isOrganic: true,
    benefits: [
      '100% pure Desi Ghee with authentic granular (danedar) texture',
      'Rich in fat-soluble vitamins A, D, E, and healthy butyric acid',
      'Traditional aroma that enhances every Pakistani dish and paratha',
      'Free from hydrogenated oils, palm oil, artificial colors, and preservatives'
    ],
    ingredients: '100% Pure Milk Fat (Desi Ghee)',
    howToUse: 'Drizzle over hot rotis, use for tadka, frying parathas, and making traditional sweet delicacies.',
    storageInstructions: 'Store in a cool, dry place. No refrigeration required. Use a dry spoon.',
    deliveryInfo: 'Delivered in glass/food-grade jars across Islamabad & Rawalpindi.',
    shelfLife: '9 Months from Packing Date',
    tags: ['Desi Ghee', 'Pure Ghee', 'Danedar', 'Traditional', 'Islamabad'],
    variants: [
      { size: '250 gm', price: 1000, originalPrice: 1200 },
      { size: '500 gm', price: 2000, originalPrice: 2400 },
      { size: '1 kg', price: 4000, originalPrice: 4800 }
    ]
  }
];

export const BESTSELLER_PRODUCTS = PRODUCTS.filter((p) => p.bestseller);

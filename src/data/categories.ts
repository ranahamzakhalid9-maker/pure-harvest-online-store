import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'flour',
    name: 'Flour & Atta',
    slug: 'flour',
    count: 3,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    description: 'Chakki fresh, stone-ground, and whole grain wheat flours with natural bran & rich wheat aroma.'
  },
  {
    id: 'pulses',
    name: 'Grains & Pulses',
    slug: 'pulses',
    count: 1,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    description: 'Organically grown, washed and unpolished lentils, grains, and protein-rich pulses.'
  },
  {
    id: 'ghee',
    name: 'Organic Ghee & Dairy',
    slug: 'ghee',
    count: 1,
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80',
    description: '100% pure traditional bilona danedar desi ghee prepared from grass-fed farm dairy.'
  }
];

export const SIDEBAR_CATEGORIES = [
  { name: 'All Products', count: 5, slug: 'all', icon: 'LayoutGrid' },
  { name: 'Flour & Atta', count: 3, slug: 'flour', icon: 'Wheat' },
  { name: 'Grains & Pulses', count: 1, slug: 'pulses', icon: 'Sprout' },
  { name: 'Desi Ghee', count: 1, slug: 'ghee', icon: 'Droplets' }
];

export const FULL_SIDEBAR_CATEGORIES = [
  { name: 'All Products', count: 5, slug: 'all' },
  { name: 'Flour & Atta', count: 3, slug: 'flour' },
  { name: 'Grains & Pulses', count: 1, slug: 'pulses' },
  { name: 'Organic Ghee & Dairy', count: 1, slug: 'ghee' }
];

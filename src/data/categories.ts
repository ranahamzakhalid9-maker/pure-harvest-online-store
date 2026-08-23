import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'flour',
    name: 'Flour & Atta',
    slug: 'flour',
    count: 5,
    image: 'https://i.postimg.cc/RF6QRwZh/1bdf141f-fb57-4248-a592-a1910a5c7b4a.png',
    description: 'Chakki fresh, stone-ground, desi white, brown-white mixed, and multigrain flours with natural bran & rich aroma.'
  },
  {
    id: 'ghee',
    name: 'Organic Desi Ghee',
    slug: 'ghee',
    count: 1,
    image: 'https://i.postimg.cc/02xX8HNh/33a473c0-69f6-4a1e-9754-60208cded94a.png',
    description: '100% pure traditional danedar Desi Ghee prepared from quality milk with rich aroma and golden texture.'
  }
];

export const SIDEBAR_CATEGORIES = [
  { name: 'All Products', count: 6, slug: 'all', icon: 'LayoutGrid' },
  { name: 'Flour & Atta', count: 5, slug: 'flour', icon: 'Wheat' },
  { name: 'Organic Desi Ghee', count: 1, slug: 'ghee', icon: 'Droplets' }
];

export const FULL_SIDEBAR_CATEGORIES = [
  { name: 'All Products', count: 6, slug: 'all' },
  { name: 'Flour & Atta', count: 5, slug: 'flour' },
  { name: 'Organic Desi Ghee', count: 1, slug: 'ghee' }
];

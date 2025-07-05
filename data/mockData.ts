import { Category, Product } from '../stores/menuStore';

// Kategoriler
export const mockCategories: Category[] = [
  {
    id: 'main-dishes',
    name: 'Ana Yemekler',
    icon: '🍽️',
  },
  {
    id: 'appetizers',
    name: 'Başlangıçlar',
    icon: '🥗',
  },
  {
    id: 'drinks',
    name: 'İçecekler',
    icon: '🥤',
  },
  {
    id: 'desserts',
    name: 'Tatlılar',
    icon: '🍰',
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    icon: '🍔',
  },
];

// Ürünler
export const mockProducts: Product[] = [
  // Ana Yemekler
  {
    id: '1',
    name: 'Karışık Pizza',
    description: 'Sucuk, sosis, mantar, biber, zeytin ile',
    price: 85,
    category: 'main-dishes',
    available: true,
  },
  {
    id: '2',
    name: 'Izgara Köfte',
    description: 'Özel baharatlarla marine edilmiş dana eti',
    price: 65,
    category: 'main-dishes',
    available: true,
  },
  {
    id: '3',
    name: 'Tavuk Şiş',
    description: 'Marine edilmiş tavuk eti, özel sos ile',
    price: 55,
    category: 'main-dishes',
    available: true,
  },
  {
    id: '4',
    name: 'Lazanya',
    description: 'Beşamel sos, domates sos, mozarella peyniri',
    price: 75,
    category: 'main-dishes',
    available: true,
  },

  // Başlangıçlar
  {
    id: '5',
    name: 'Çoban Salata',
    description: 'Domates, salatalık, soğan, biber',
    price: 25,
    category: 'appetizers',
    available: true,
  },
  {
    id: '6',
    name: 'Mercimek Çorbası',
    description: 'Geleneksel Türk mutfağından',
    price: 20,
    category: 'appetizers',
    available: true,
  },
  {
    id: '7',
    name: 'Humus',
    description: 'Nohut püresi, tahin, zeytinyağı',
    price: 30,
    category: 'appetizers',
    available: true,
  },

  // İçecekler
  {
    id: '8',
    name: 'Coca Cola',
    description: '330ml',
    price: 12,
    category: 'drinks',
    available: true,
  },
  {
    id: '9',
    name: 'Ayran',
    description: '500ml',
    price: 8,
    category: 'drinks',
    available: true,
  },
  {
    id: '10',
    name: 'Taze Portakal Suyu',
    description: '300ml',
    price: 18,
    category: 'drinks',
    available: true,
  },
  {
    id: '11',
    name: 'Türk Kahvesi',
    description: 'Geleneksel Türk kahvesi',
    price: 15,
    category: 'drinks',
    available: true,
  },

  // Tatlılar
  {
    id: '12',
    name: 'Künefe',
    description: 'Antep fıstığı ile',
    price: 35,
    category: 'desserts',
    available: true,
  },
  {
    id: '13',
    name: 'Tiramisu',
    description: 'İtalyan usulü',
    price: 40,
    category: 'desserts',
    available: true,
  },
  {
    id: '14',
    name: 'Çikolatalı Sufle',
    description: 'Sıcak servis edilir',
    price: 30,
    category: 'desserts',
    available: true,
  },

  // Fast Food
  {
    id: '15',
    name: 'Cheeseburger',
    description: 'Dana eti, cheddar peyniri, marul, domates',
    price: 45,
    category: 'fast-food',
    available: true,
  },
  {
    id: '16',
    name: 'Chicken Burger',
    description: 'Tavuk göğsü, marul, mayonez',
    price: 40,
    category: 'fast-food',
    available: true,
  },
  {
    id: '17',
    name: 'Patates Kızartması',
    description: 'Çıtır çıtır, tuzlu',
    price: 20,
    category: 'fast-food',
    available: true,
  },
  {
    id: '18',
    name: 'Soğan Halkası',
    description: '8 adet, ranch sos ile',
    price: 25,
    category: 'fast-food',
    available: true,
  },
];

// Örnek masa verileri
export const mockTables = [
  { id: 'table-1', name: 'Masa 1', capacity: 4 },
  { id: 'table-2', name: 'Masa 2', capacity: 6 },
  { id: 'table-3', name: 'Masa 3', capacity: 2 },
  { id: 'table-4', name: 'Masa 4', capacity: 8 },
  { id: 'table-5', name: 'Masa 5', capacity: 4 },
];

// Örnek kupon kodları
export const mockCoupons = [
  { code: 'WELCOME10', discount: 10, type: 'percentage', valid: true },
  { code: 'SAVE20', discount: 20, type: 'percentage', valid: true },
  { code: 'FIXED50', discount: 50, type: 'fixed', valid: true },
  { code: 'EXPIRED', discount: 15, type: 'percentage', valid: false },
]; 
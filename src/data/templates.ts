export interface Template {
  id: string;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  category: string;
  priceUSD: number;
  oldPriceUSD?: number;
  image: string;
  features: string[];
  isNew?: boolean;
  isHot?: boolean;
  rating: number;
  reviewCount: number;
}

export interface Category {
  id: string;
  slug: string;
  name: Record<string, string>;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: '1', slug: 'dental', name: { ru: 'Стоматологии', kz: 'Стоматология', uz: 'Stomatologiya' }, icon: '🦷', count: 24 },
  { id: '2', slug: 'auto', name: { ru: 'Автосервисы', kz: 'Автосервис', uz: 'Avtoservis' }, icon: '🚗', count: 18 },
  { id: '3', slug: 'restaurant', name: { ru: 'Рестораны', kz: 'Мейрамханалар', uz: 'Restoranlar' }, icon: '🍽️', count: 32 },
  { id: '4', slug: 'beauty', name: { ru: 'Салоны красоты', kz: 'Сұлулық салондары', uz: 'Go\'zallik salonlari' }, icon: '💅', count: 28 },
  { id: '5', slug: 'medical', name: { ru: 'Медицинские центры', kz: 'Медициналық орталықтар', uz: 'Tibbiyot markazlari' }, icon: '🏥', count: 15 },
  { id: '6', slug: 'education', name: { ru: 'Образование', kz: 'Білім беру', uz: 'Ta\'lim' }, icon: '📚', count: 21 },
  { id: '7', slug: 'fitness', name: { ru: 'Фитнес', kz: 'Фитнес', uz: 'Fitnes' }, icon: '💪', count: 12 },
  { id: '8', slug: 'realestate', name: { ru: 'Недвижимость', kz: 'Жылжымайтын мүлік', uz: 'Ko\'chmas mulk' }, icon: '🏠', count: 19 },
];

export const templates: Template[] = [
  {
    id: '1',
    slug: 'dental-pro',
    name: { ru: 'DentalPro', kz: 'DentalPro', uz: 'DentalPro' },
    description: { 
      ru: 'Современный сайт для стоматологической клиники с онлайн-записью', 
      kz: 'Онлайн жазылуы бар заманауи стоматологиялық клиника сайты',
      uz: 'Onlayn yozilish bilan zamonaviy stomatologiya klinikasi sayti'
    },
    category: 'dental',
    priceUSD: 299,
    oldPriceUSD: 399,
    image: '/placeholder.svg',
    features: ['Онлайн-запись', 'Адаптивный дизайн', 'SEO-оптимизация'],
    isHot: true,
    rating: 4.9,
    reviewCount: 47,
  },
  {
    id: '2',
    slug: 'autoservice-x',
    name: { ru: 'AutoService X', kz: 'AutoService X', uz: 'AutoService X' },
    description: { 
      ru: 'Профессиональный сайт для автосервиса с калькулятором услуг', 
      kz: 'Қызметтер калькуляторы бар кәсіби автосервис сайты',
      uz: 'Xizmatlar kalkulyatori bilan professional avtoservis sayti'
    },
    category: 'auto',
    priceUSD: 249,
    image: '/placeholder.svg',
    features: ['Калькулятор услуг', 'Галерея работ', 'Форма заявки'],
    isNew: true,
    rating: 4.8,
    reviewCount: 32,
  },
  {
    id: '3',
    slug: 'resto-elegant',
    name: { ru: 'RestoElegant', kz: 'RestoElegant', uz: 'RestoElegant' },
    description: { 
      ru: 'Элегантный сайт для ресторана с меню и бронированием столиков', 
      kz: 'Мәзір мен үстел брондауы бар талғампаз мейрамхана сайты',
      uz: 'Menyu va stol bron qilish bilan nafis restoran sayti'
    },
    category: 'restaurant',
    priceUSD: 349,
    oldPriceUSD: 449,
    image: '/placeholder.svg',
    features: ['Онлайн-меню', 'Бронирование', 'Галерея блюд'],
    isHot: true,
    rating: 4.9,
    reviewCount: 58,
  },
  {
    id: '4',
    slug: 'beauty-studio',
    name: { ru: 'BeautyStudio', kz: 'BeautyStudio', uz: 'BeautyStudio' },
    description: { 
      ru: 'Стильный сайт для салона красоты с портфолио мастеров', 
      kz: 'Шеберлер портфолиосы бар стильді сұлулық салоны сайты',
      uz: 'Ustalar portfoliosi bilan zamonaviy go\'zallik saloni sayti'
    },
    category: 'beauty',
    priceUSD: 279,
    image: '/placeholder.svg',
    features: ['Портфолио', 'Прайс-лист', 'Онлайн-запись'],
    rating: 4.7,
    reviewCount: 41,
  },
  {
    id: '5',
    slug: 'medcenter-plus',
    name: { ru: 'MedCenter+', kz: 'MedCenter+', uz: 'MedCenter+' },
    description: { 
      ru: 'Надежный сайт для медицинского центра с записью к врачам', 
      kz: 'Дәрігерлерге жазылуы бар сенімді медициналық орталық сайты',
      uz: 'Shifokorlarga yozilish bilan ishonchli tibbiyot markazi sayti'
    },
    category: 'medical',
    priceUSD: 399,
    image: '/placeholder.svg',
    features: ['Запись к врачам', 'Каталог услуг', 'Личный кабинет'],
    isNew: true,
    rating: 4.8,
    reviewCount: 29,
  },
  {
    id: '6',
    slug: 'fitness-power',
    name: { ru: 'FitnessPower', kz: 'FitnessPower', uz: 'FitnessPower' },
    description: { 
      ru: 'Энергичный сайт для фитнес-клуба с расписанием тренировок', 
      kz: 'Жаттығу кестесі бар қуатты фитнес-клуб сайты',
      uz: 'Mashgʻulotlar jadvali bilan quvvatli fitnes-klub sayti'
    },
    category: 'fitness',
    priceUSD: 299,
    oldPriceUSD: 349,
    image: '/placeholder.svg',
    features: ['Расписание', 'Тренеры', 'Абонементы'],
    rating: 4.6,
    reviewCount: 23,
  },
];

export function getTemplatesByCategory(categorySlug: string): Template[] {
  if (categorySlug === 'all') return templates;
  return templates.filter(t => t.category === categorySlug);
}

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find(t => t.slug === slug);
}

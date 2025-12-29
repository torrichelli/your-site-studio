export type Language = 'ru' | 'kz' | 'uz';
export type Country = 'kz' | 'uz' | 'kg';

export interface Region {
  country: Country;
  city: string;
  cityName: Record<Language, string>;
}

export const countries: Record<Country, { name: Record<Language, string>; currency: string; currencySymbol: string }> = {
  kz: {
    name: { ru: 'Казахстан', kz: 'Қазақстан', uz: 'Qozogʻiston' },
    currency: 'KZT',
    currencySymbol: '₸',
  },
  uz: {
    name: { ru: 'Узбекистан', kz: 'Өзбекстан', uz: 'Oʻzbekiston' },
    currency: 'UZS',
    currencySymbol: 'сўм',
  },
  kg: {
    name: { ru: 'Кыргызстан', kz: 'Қырғызстан', uz: 'Qirgʻiziston' },
    currency: 'KGS',
    currencySymbol: 'сом',
  },
};

export const cities: Record<Country, Array<{ slug: string; name: Record<Language, string> }>> = {
  kz: [
    { slug: 'almaty', name: { ru: 'Алматы', kz: 'Алматы', uz: 'Olma-Ota' } },
    { slug: 'astana', name: { ru: 'Астана', kz: 'Астана', uz: 'Ostona' } },
    { slug: 'shymkent', name: { ru: 'Шымкент', kz: 'Шымкент', uz: 'Shimkent' } },
    { slug: 'karaganda', name: { ru: 'Караганда', kz: 'Қарағанды', uz: 'Qoragʻandi' } },
  ],
  uz: [
    { slug: 'tashkent', name: { ru: 'Ташкент', kz: 'Ташкент', uz: 'Toshkent' } },
    { slug: 'samarkand', name: { ru: 'Самарканд', kz: 'Самарқанд', uz: 'Samarqand' } },
    { slug: 'bukhara', name: { ru: 'Бухара', kz: 'Бұхара', uz: 'Buxoro' } },
  ],
  kg: [
    { slug: 'bishkek', name: { ru: 'Бишкек', kz: 'Бішкек', uz: 'Bishkek' } },
    { slug: 'osh', name: { ru: 'Ош', kz: 'Ош', uz: 'Oʻsh' } },
  ],
};

export const translations = {
  ru: {
    nav: {
      home: 'Главная',
      catalog: 'Каталог',
      blog: 'Блог',
      contacts: 'Контакты',
      login: 'Войти',
      dashboard: 'Личный кабинет',
    },
    hero: {
      title: 'Готовые сайты для бизнеса',
      titleCity: 'Готовые сайты для бизнеса в',
      subtitle: 'Выбираете шаблон — мы адаптируем и запускаем за 24 часа',
      cta: 'Выбрать сайт',
      demo: 'Смотреть демо',
    },
    categories: {
      title: 'Популярные ниши',
      subtitle: 'Выберите направление для вашего бизнеса',
    },
    howItWorks: {
      title: 'Как это работает',
      subtitle: 'Три простых шага до запуска вашего сайта',
      step1: { title: 'Выберите шаблон', desc: 'Найдите идеальный дизайн для вашего бизнеса' },
      step2: { title: 'Мы адаптируем', desc: 'Настроим под ваш бренд и контент' },
      step3: { title: 'Запуск за 24 часа', desc: 'Ваш сайт готов к работе' },
    },
    popular: {
      title: 'Популярные сайты',
      subtitle: 'Лучшие решения для вашего бизнеса',
      viewAll: 'Смотреть все',
    },
    trust: {
      title: 'Нам доверяют',
      sites: 'Запущено сайтов',
      clients: 'Довольных клиентов',
      rating: 'Средняя оценка',
    },
    cta: {
      title: 'Готовы запустить свой сайт?',
      subtitle: 'Выберите шаблон и получите готовый сайт за 24 часа',
      button: 'Выбрать шаблон',
    },
    footer: {
      description: 'Платформа готовых сайтов для бизнеса. Часть экосистемы CreativeGroup.',
      company: 'Компания',
      support: 'Поддержка',
      legal: 'Правовая информация',
      about: 'О нас',
      careers: 'Карьера',
      help: 'Помощь',
      faq: 'FAQ',
      privacy: 'Политика конфиденциальности',
      terms: 'Оферта',
      copyright: '© YOURSITE, часть CreativeGroup',
    },
    catalog: {
      title: 'Каталог сайтов',
      filters: 'Фильтры',
      sort: 'Сортировка',
      price: 'Цена',
      category: 'Категория',
      all: 'Все',
      results: 'результатов',
    },
    template: {
      preview: 'Демо',
      buy: 'Купить',
      from: 'от',
    },
  },
  kz: {
    nav: {
      home: 'Басты',
      catalog: 'Каталог',
      blog: 'Блог',
      contacts: 'Байланыс',
      login: 'Кіру',
      dashboard: 'Жеке кабинет',
    },
    hero: {
      title: 'Бизнеске арналған дайын сайттар',
      titleCity: 'Бизнеске арналған дайын сайттар',
      subtitle: 'Үлгіні таңдаңыз — біз 24 сағатта бейімдеп іске қосамыз',
      cta: 'Сайт таңдау',
      demo: 'Демо көру',
    },
    categories: {
      title: 'Танымал бағыттар',
      subtitle: 'Бизнесіңізге бағыт таңдаңыз',
    },
    howItWorks: {
      title: 'Бұл қалай жұмыс істейді',
      subtitle: 'Сайтыңызды іске қосуға дейін үш қарапайым қадам',
      step1: { title: 'Үлгіні таңдаңыз', desc: 'Бизнесіңізге арналған тамаша дизайн табыңыз' },
      step2: { title: 'Біз бейімдейміз', desc: 'Брендіңізге және мазмұнға орнатамыз' },
      step3: { title: '24 сағатта іске қосу', desc: 'Сіздің сайтыңыз жұмысқа дайын' },
    },
    popular: {
      title: 'Танымал сайттар',
      subtitle: 'Бизнесіңізге арналған үздік шешімдер',
      viewAll: 'Барлығын көру',
    },
    trust: {
      title: 'Бізге сенеді',
      sites: 'Іске қосылған сайттар',
      clients: 'Қанағаттанған клиенттер',
      rating: 'Орташа баға',
    },
    cta: {
      title: 'Сайтыңызды іске қосуға дайынсыз ба?',
      subtitle: 'Үлгіні таңдаңыз және 24 сағатта дайын сайт алыңыз',
      button: 'Үлгіні таңдау',
    },
    footer: {
      description: 'Бизнеске арналған дайын сайттар платформасы. CreativeGroup экожүйесінің бөлігі.',
      company: 'Компания',
      support: 'Қолдау',
      legal: 'Құқықтық ақпарат',
      about: 'Біз туралы',
      careers: 'Мансап',
      help: 'Көмек',
      faq: 'FAQ',
      privacy: 'Құпиялылық саясаты',
      terms: 'Оферта',
      copyright: '© YOURSITE, CreativeGroup бөлігі',
    },
    catalog: {
      title: 'Сайттар каталогы',
      filters: 'Сүзгілер',
      sort: 'Сұрыптау',
      price: 'Баға',
      category: 'Категория',
      all: 'Барлығы',
      results: 'нәтиже',
    },
    template: {
      preview: 'Демо',
      buy: 'Сатып алу',
      from: 'бастап',
    },
  },
  uz: {
    nav: {
      home: 'Bosh sahifa',
      catalog: 'Katalog',
      blog: 'Blog',
      contacts: 'Aloqa',
      login: 'Kirish',
      dashboard: 'Shaxsiy kabinet',
    },
    hero: {
      title: 'Biznes uchun tayyor saytlar',
      titleCity: 'Biznes uchun tayyor saytlar',
      subtitle: 'Shablonni tanlang — biz 24 soat ichida moslashtiramiz va ishga tushiramiz',
      cta: 'Sayt tanlash',
      demo: 'Demo ko\'rish',
    },
    categories: {
      title: 'Mashhur yo\'nalishlar',
      subtitle: 'Biznesingiz uchun yo\'nalish tanlang',
    },
    howItWorks: {
      title: 'Bu qanday ishlaydi',
      subtitle: 'Saytingizni ishga tushirishgacha uchta oddiy qadam',
      step1: { title: 'Shablonni tanlang', desc: 'Biznesingiz uchun ideal dizaynni toping' },
      step2: { title: 'Biz moslashtiramiz', desc: 'Brendingiz va kontentingizga sozlaymiz' },
      step3: { title: '24 soatda ishga tushirish', desc: 'Saytingiz ishlashga tayyor' },
    },
    popular: {
      title: 'Mashhur saytlar',
      subtitle: 'Biznesingiz uchun eng yaxshi yechimlar',
      viewAll: 'Barchasini ko\'rish',
    },
    trust: {
      title: 'Bizga ishonishadi',
      sites: 'Ishga tushirilgan saytlar',
      clients: 'Mamnun mijozlar',
      rating: 'O\'rtacha baho',
    },
    cta: {
      title: 'Saytingizni ishga tushirishga tayyormisiz?',
      subtitle: 'Shablonni tanlang va 24 soat ichida tayyor sayt oling',
      button: 'Shablonni tanlash',
    },
    footer: {
      description: 'Biznes uchun tayyor saytlar platformasi. CreativeGroup ekotizimining bir qismi.',
      company: 'Kompaniya',
      support: 'Qo\'llab-quvvatlash',
      legal: 'Huquqiy ma\'lumot',
      about: 'Biz haqimizda',
      careers: 'Karyera',
      help: 'Yordam',
      faq: 'FAQ',
      privacy: 'Maxfiylik siyosati',
      terms: 'Oferta',
      copyright: '© YOURSITE, CreativeGroup qismi',
    },
    catalog: {
      title: 'Saytlar katalogi',
      filters: 'Filtrlar',
      sort: 'Saralash',
      price: 'Narx',
      category: 'Kategoriya',
      all: 'Hammasi',
      results: 'natija',
    },
    template: {
      preview: 'Demo',
      buy: 'Sotib olish',
      from: 'dan',
    },
  },
};

export function getTranslations(lang: Language) {
  return translations[lang] || translations.ru;
}

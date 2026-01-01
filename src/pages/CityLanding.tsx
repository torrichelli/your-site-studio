import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle, Zap, Shield, Star, Users, BarChart3, MapPin, Building2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { CategoryCard } from '@/components/templates/CategoryCard';
import { useRegion } from '@/contexts/RegionContext';
import { templates, categories } from '@/data/templates';
import { cities, countries, Country, Language } from '@/lib/i18n';

// SEO texts for cities
const getCitySeoContent = (citySlug: string, cityName: string, countryName: string, language: Language) => {
  const seoTexts: Record<Language, Record<string, { title: string; description: string; h1: string; intro: string; whyUs: string[] }>> = {
    ru: {
      almaty: {
        title: `Готовые сайты для бизнеса в Алматы — Yoursite`,
        description: `Купить готовый сайт в Алматы. Шаблоны для бизнеса с адаптацией и запуском за 24 часа. Более 500 готовых решений.`,
        h1: `Готовые сайты для бизнеса в Алматы`,
        intro: `Алматы — крупнейший мегаполис Казахстана и центр деловой активности. Мы помогаем предпринимателям Алматы быстро запустить современный сайт для бизнеса. Выберите готовый шаблон, и мы адаптируем его под ваш бренд за 24 часа.`,
        whyUs: [
          'Более 500 готовых шаблонов для любой ниши',
          'Адаптация под казахстанский рынок',
          'Оплата в тенге через Kaspi и Halyk',
          'Техподдержка на русском и казахском языках',
        ],
      },
      astana: {
        title: `Готовые сайты для бизнеса в Астане — Yoursite`,
        description: `Купить готовый сайт в Астане. Современные шаблоны для бизнеса с запуском за 24 часа. Оплата в тенге.`,
        h1: `Готовые сайты для бизнеса в Астане`,
        intro: `Астана — столица Казахстана и быстрорастущий деловой центр. Предприниматели Астаны выбирают наши готовые сайты для быстрого старта онлайн-бизнеса. Мы предлагаем современные решения с адаптацией под ваш бренд.`,
        whyUs: [
          'Быстрый запуск без длительных согласований',
          'Интеграция с популярными платёжными системами КЗ',
          'SEO-оптимизация для казахстанского рынка',
          'Поддержка 24/7 в Астане',
        ],
      },
      tashkent: {
        title: `Готовые сайты для бизнеса в Ташкенте — Yoursite`,
        description: `Купить готовый сайт в Ташкенте. Шаблоны для бизнеса с оплатой через Payme и Click. Запуск за 24 часа.`,
        h1: `Готовые сайты для бизнеса в Ташкенте`,
        intro: `Ташкент — столица Узбекистана и крупнейший экономический центр региона. Мы помогаем бизнесу Ташкента выходить в онлайн с готовыми сайтами, адаптированными под узбекский рынок.`,
        whyUs: [
          'Оплата через Payme, Click и Uzum',
          'Цены в узбекских сумах',
          'Адаптация контента на узбекский язык',
          'Локальная техподдержка',
        ],
      },
      bishkek: {
        title: `Готовые сайты для бизнеса в Бишкеке — Yoursite`,
        description: `Купить готовый сайт в Бишкеке. Шаблоны для бизнеса с адаптацией под кыргызский рынок. Запуск за 24 часа.`,
        h1: `Готовые сайты для бизнеса в Бишкеке`,
        intro: `Бишкек — столица Кыргызстана и центр предпринимательской активности страны. Наши готовые сайты помогают бизнесу Бишкека быстро выйти в онлайн и начать привлекать клиентов.`,
        whyUs: [
          'Оплата через Элкарт и MBANK',
          'Цены в кыргызских сомах',
          'Поддержка на русском языке',
          'Быстрая адаптация под местный рынок',
        ],
      },
    },
    kz: {
      almaty: {
        title: `Алматыдағы бизнеске арналған дайын сайттар — Yoursite`,
        description: `Алматыда дайын сайт сатып алыңыз. 24 сағатта бейімдеу және іске қосу. 500-ден астам дайын шешімдер.`,
        h1: `Алматыдағы бизнеске арналған дайын сайттар`,
        intro: `Алматы — Қазақстанның ең ірі мегаполисі және іскерлік белсенділік орталығы. Біз Алматы кәсіпкерлеріне бизнеске арналған заманауи сайтты жылдам іске қосуға көмектесеміз.`,
        whyUs: [
          '500-ден астам дайын үлгілер',
          'Қазақстан нарығына бейімдеу',
          'Kaspi және Halyk арқылы теңгемен төлем',
          'Қазақ және орыс тілдерінде техникалық қолдау',
        ],
      },
      astana: {
        title: `Астанадағы бизнеске арналған дайын сайттар — Yoursite`,
        description: `Астанада дайын сайт сатып алыңыз. 24 сағатта іске қосу. Теңгемен төлем.`,
        h1: `Астанадағы бизнеске арналған дайын сайттар`,
        intro: `Астана — Қазақстанның астанасы және жылдам дамып келе жатқан іскерлік орталық. Астана кәсіпкерлері онлайн-бизнесті жылдам бастау үшін біздің дайын сайттарды таңдайды.`,
        whyUs: [
          'Ұзақ келісімсіз жылдам іске қосу',
          'ҚР танымал төлем жүйелерімен интеграция',
          'Қазақстан нарығы үшін SEO-оңтайландыру',
          'Астанада тәулік бойы қолдау',
        ],
      },
      tashkent: {
        title: `Ташкенттегі бизнеске арналған дайын сайттар — Yoursite`,
        description: `Ташкентте дайын сайт сатып алыңыз. Payme және Click арқылы төлем. 24 сағатта іске қосу.`,
        h1: `Ташкенттегі бизнеске арналған дайын сайттар`,
        intro: `Ташкент — Өзбекстан астанасы және аймақтың ең ірі экономикалық орталығы. Біз Ташкент бизнесіне өзбек нарығына бейімделген дайын сайттармен онлайн шығуға көмектесеміз.`,
        whyUs: [
          'Payme, Click және Uzum арқылы төлем',
          'Өзбек сумында бағалар',
          'Өзбек тіліне мазмұнды бейімдеу',
          'Жергілікті техникалық қолдау',
        ],
      },
      bishkek: {
        title: `Бішкектегі бизнеске арналған дайын сайттар — Yoursite`,
        description: `Бішкекте дайын сайт сатып алыңыз. Қырғыз нарығына бейімдеу. 24 сағатта іске қосу.`,
        h1: `Бішкектегі бизнеске арналған дайын сайттар`,
        intro: `Бішкек — Қырғызстан астанасы және елдің кәсіпкерлік белсенділігінің орталығы. Біздің дайын сайттар Бішкек бизнесіне онлайн шығуға және клиенттерді тартуға көмектеседі.`,
        whyUs: [
          'Элкарт және MBANK арқылы төлем',
          'Қырғыз сомында бағалар',
          'Орыс тілінде қолдау',
          'Жергілікті нарыққа жылдам бейімдеу',
        ],
      },
    },
    uz: {
      almaty: {
        title: `Olma-Otada biznes uchun tayyor saytlar — Yoursite`,
        description: `Olma-Otada tayyor sayt sotib oling. 24 soat ichida moslashuv va ishga tushirish. 500 dan ortiq tayyor yechimlar.`,
        h1: `Olma-Otada biznes uchun tayyor saytlar`,
        intro: `Olma-Ota — Qozog'istonning eng yirik megapolisi va ishbilarmonlik faoliyati markazi. Biz Olma-Ota tadbirkorlariga biznes uchun zamonaviy saytni tez ishga tushirishga yordam beramiz.`,
        whyUs: [
          '500 dan ortiq tayyor shablonlar',
          'Qozog\'iston bozoriga moslashuv',
          'Kaspi va Halyk orqali tenge bilan to\'lov',
          'Qozoq va rus tillarida texnik yordam',
        ],
      },
      tashkent: {
        title: `Toshkentda biznes uchun tayyor saytlar — Yoursite`,
        description: `Toshkentda tayyor sayt sotib oling. Payme va Click orqali to'lov. 24 soat ichida ishga tushirish.`,
        h1: `Toshkentda biznes uchun tayyor saytlar`,
        intro: `Toshkent — O'zbekiston poytaxti va mintaqaning eng yirik iqtisodiy markazi. Biz Toshkent biznesiga o'zbek bozoriga moslashtirilgan tayyor saytlar bilan onlayn chiqishga yordam beramiz.`,
        whyUs: [
          'Payme, Click va Uzum orqali to\'lov',
          'O\'zbek so\'mida narxlar',
          'O\'zbek tiliga kontent moslashtirish',
          'Mahalliy texnik yordam',
        ],
      },
      bishkek: {
        title: `Bishkekda biznes uchun tayyor saytlar — Yoursite`,
        description: `Bishkekda tayyor sayt sotib oling. Qirg'iz bozoriga moslashuv. 24 soat ichida ishga tushirish.`,
        h1: `Bishkekda biznes uchun tayyor saytlar`,
        intro: `Bishkek — Qirg'iziston poytaxti va mamlakatning tadbirkorlik faoliyati markazi. Bizning tayyor saytlarimiz Bishkek biznesiga onlayn chiqishga va mijozlarni jalb qilishga yordam beradi.`,
        whyUs: [
          'Elkart va MBANK orqali to\'lov',
          'Qirg\'iz somida narxlar',
          'Rus tilida yordam',
          'Mahalliy bozorga tez moslashuv',
        ],
      },
      astana: {
        title: `Ostonada biznes uchun tayyor saytlar — Yoursite`,
        description: `Ostonada tayyor sayt sotib oling. 24 soat ichida ishga tushirish. Tenge bilan to'lov.`,
        h1: `Ostonada biznes uchun tayyor saytlar`,
        intro: `Ostona — Qozog'iston poytaxti va tez rivojlanayotgan ishbilarmonlik markazi. Ostona tadbirkorlari onlayn biznesni tez boshlash uchun bizning tayyor saytlarimizni tanlaydilar.`,
        whyUs: [
          'Uzoq kelishuvlarsiz tez ishga tushirish',
          'QR mashhur to\'lov tizimlari bilan integratsiya',
          'Qozog\'iston bozori uchun SEO-optimallashtirish',
          'Ostonada 24/7 yordam',
        ],
      },
    },
  };

  // Default content for cities without specific SEO text
  const defaultContent = {
    ru: {
      title: `Готовые сайты для бизнеса в ${cityName} — Yoursite`,
      description: `Купить готовый сайт в ${cityName}, ${countryName}. Современные шаблоны с адаптацией и запуском за 24 часа.`,
      h1: `Готовые сайты для бизнеса в ${cityName}`,
      intro: `${cityName} — один из ключевых городов региона. Мы помогаем предпринимателям ${cityName} быстро запустить современный сайт для бизнеса. Выберите готовый шаблон, и мы адаптируем его под ваш бренд за 24 часа.`,
      whyUs: [
        'Более 500 готовых шаблонов для любой ниши',
        'Адаптация под локальный рынок',
        'Удобные способы оплаты',
        'Профессиональная техподдержка',
      ],
    },
    kz: {
      title: `${cityName} қаласындағы бизнеске арналған дайын сайттар — Yoursite`,
      description: `${cityName}, ${countryName} қаласында дайын сайт сатып алыңыз. 24 сағатта бейімдеу және іске қосу.`,
      h1: `${cityName} қаласындағы бизнеске арналған дайын сайттар`,
      intro: `${cityName} — аймақтың негізгі қалаларының бірі. Біз ${cityName} кәсіпкерлеріне бизнеске арналған заманауи сайтты жылдам іске қосуға көмектесеміз.`,
      whyUs: [
        '500-ден астам дайын үлгілер',
        'Жергілікті нарыққа бейімдеу',
        'Ыңғайлы төлем әдістері',
        'Кәсіби техникалық қолдау',
      ],
    },
    uz: {
      title: `${cityName}da biznes uchun tayyor saytlar — Yoursite`,
      description: `${cityName}, ${countryName}da tayyor sayt sotib oling. 24 soat ichida moslashuv va ishga tushirish.`,
      h1: `${cityName}da biznes uchun tayyor saytlar`,
      intro: `${cityName} — mintaqaning asosiy shaharlaridan biri. Biz ${cityName} tadbirkorlariga biznes uchun zamonaviy saytni tez ishga tushirishga yordam beramiz.`,
      whyUs: [
        '500 dan ortiq tayyor shablonlar',
        'Mahalliy bozorga moslashuv',
        'Qulay to\'lov usullari',
        'Professional texnik yordam',
      ],
    },
  };

  return seoTexts[language]?.[citySlug] || defaultContent[language];
};

export default function CityLanding() {
  const { country, city: citySlug } = useParams<{ country: string; city: string }>();
  const { language, setRegion, t, formatPrice, getCityName: getRegionCityName } = useRegion();

  // Validate country and city
  const validCountry = country as Country;
  const countryCities = cities[validCountry];
  
  if (!countryCities) {
    return <Navigate to="/" replace />;
  }

  const cityData = countryCities.find(c => c.slug === citySlug);
  
  if (!cityData) {
    return <Navigate to={`/${country}`} replace />;
  }

  const cityName = cityData.name[language];
  const countryName = countries[validCountry].name[language];
  const seoContent = getCitySeoContent(citySlug!, cityName, countryName, language);

  // Set region when page loads
  useEffect(() => {
    if (validCountry && citySlug) {
      setRegion(validCountry, citySlug);
    }
  }, [validCountry, citySlug, setRegion]);

  const popularTemplates = templates.slice(0, 6);
  const popularCategories = categories.slice(0, 8);

  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Yoursite - ${cityName}`,
    "description": seoContent.description,
    "url": `https://yoursite.kz/${country}/${citySlug}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": countries[validCountry].name.ru,
    },
    "areaServed": {
      "@type": "City",
      "name": cityName,
    },
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t.nav.home,
        "item": "https://yoursite.kz",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": countryName,
        "item": `https://yoursite.kz/${country}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cityName,
        "item": `https://yoursite.kz/${country}/${citySlug}`,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{seoContent.title}</title>
        <meta name="description" content={seoContent.description} />
        <link rel="canonical" href={`https://yoursite.kz/${country}/${citySlug}`} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="ru" href={`https://yoursite.kz/${country}/${citySlug}`} />
        <link rel="alternate" hrefLang="kk" href={`https://yoursite.kz/${country}/${citySlug}`} />
        <link rel="alternate" hrefLang="uz" href={`https://yoursite.kz/${country}/${citySlug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://yoursite.kz/${country}/${citySlug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoContent.title} />
        <meta property="og:description" content={seoContent.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yoursite.kz/${country}/${citySlug}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>

      <Layout>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
          </div>

          <div className="container relative">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">{t.nav.home}</Link>
                </li>
                <li>/</li>
                <li>
                  <Link to={`/${country}`} className="hover:text-primary transition-colors">{countryName}</Link>
                </li>
                <li>/</li>
                <li className="text-foreground font-medium">{cityName}</li>
              </ol>
            </nav>

            <div className="mx-auto max-w-4xl text-center">
              {/* Location Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{cityName}, {countryName}</span>
              </div>

              {/* H1 Title */}
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {seoContent.h1.split(cityName)[0]}
                <span className="text-gradient-primary">{cityName}</span>
              </h1>

              {/* Intro text */}
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                {seoContent.intro}
              </p>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link to="/catalog">
                  <Button variant="hero" size="xl" className="gap-2">
                    {t.hero.cta}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="hero-secondary" size="xl" className="gap-2">
                  {t.hero.demo}
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">Без брифов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-warning" />
                  <span className="text-sm text-muted-foreground">Запуск за 24 часа</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Гарантия качества</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Us Section - City Specific */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {language === 'ru' && `Почему предприниматели ${cityName} выбирают нас`}
                {language === 'kz' && `${cityName} кәсіпкерлері бізді неге таңдайды`}
                {language === 'uz' && `Nega ${cityName} tadbirkorlari bizni tanlashadi`}
              </h2>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {seoContent.whyUs.map((item, index) => (
                <div key={index} className="flex items-start gap-4 rounded-2xl border border-border/50 bg-card p-6 shadow-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-muted/50 py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {t.categories.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {t.categories.subtitle}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {popularCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Templates in City */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  {language === 'ru' && `Популярно в ${cityName}`}
                  {language === 'kz' && `${cityName} қаласында танымал`}
                  {language === 'uz' && `${cityName}da mashhur`}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  {t.popular.subtitle}
                </p>
              </div>
              <Link to="/catalog" className="hidden md:block">
                <Button variant="outline" className="gap-2">
                  {t.popular.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popularTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link to="/catalog">
                <Button variant="outline" className="gap-2">
                  {t.popular.viewAll}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-muted/50 py-20 md:py-28">
          <div className="container">
            <div className="mb-16 text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {t.trust.title}
              </h2>
            </div>

            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-border/50 bg-card p-8 text-center shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <BarChart3 className="h-7 w-7 text-primary" />
                </div>
                <div className="font-display text-4xl font-bold text-primary">500+</div>
                <p className="mt-2 text-muted-foreground">{t.trust.sites}</p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card p-8 text-center shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                  <Users className="h-7 w-7 text-accent" />
                </div>
                <div className="font-display text-4xl font-bold text-accent">1200+</div>
                <p className="mt-2 text-muted-foreground">{t.trust.clients}</p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card p-8 text-center shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-warning/10">
                  <Star className="h-7 w-7 text-warning" />
                </div>
                <div className="font-display text-4xl font-bold text-warning">4.9</div>
                <p className="mt-2 text-muted-foreground">{t.trust.rating}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Text Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-4xl prose prose-lg dark:prose-invert">
              <h2>
                {language === 'ru' && `Готовые сайты для бизнеса в ${cityName}`}
                {language === 'kz' && `${cityName} қаласындағы бизнеске арналған дайын сайттар`}
                {language === 'uz' && `${cityName}da biznes uchun tayyor saytlar`}
              </h2>
              <p>
                {seoContent.intro}
              </p>
              <p>
                {language === 'ru' && `Наша платформа предлагает более 500 готовых шаблонов сайтов для различных ниш: от стоматологий и автосервисов до ресторанов и интернет-магазинов. Каждый шаблон адаптирован под современные требования и оптимизирован для поисковых систем.`}
                {language === 'kz' && `Біздің платформа әр түрлі бағыттар үшін 500-ден астам дайын сайт үлгілерін ұсынады: стоматологиялар мен автосервистерден мейрамханалар мен интернет-дүкендерге дейін.`}
                {language === 'uz' && `Bizning platformamiz turli yo'nalishlar uchun 500 dan ortiq tayyor sayt shablonlarini taklif qiladi: stomatologiyalar va avtoservislardan restoran va onlayn do'konlargacha.`}
              </p>
              <h3>
                {language === 'ru' && `Как заказать сайт в ${cityName}?`}
                {language === 'kz' && `${cityName} қаласында сайтты қалай тапсырыс беруге болады?`}
                {language === 'uz' && `${cityName}da saytni qanday buyurtma qilish mumkin?`}
              </h3>
              <ol>
                <li>{t.howItWorks.step1.title} — {t.howItWorks.step1.desc}</li>
                <li>{t.howItWorks.step2.title} — {t.howItWorks.step2.desc}</li>
                <li>{t.howItWorks.step3.title} — {t.howItWorks.step3.desc}</li>
              </ol>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-primary opacity-90" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10" />
          
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
                {t.cta.title}
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/80">
                {t.cta.subtitle}
              </p>
              <div className="mt-10">
                <Link to="/catalog">
                  <Button 
                    size="xl" 
                    className="gap-2 bg-background text-foreground shadow-xl hover:bg-background/90"
                  >
                    {t.cta.button}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

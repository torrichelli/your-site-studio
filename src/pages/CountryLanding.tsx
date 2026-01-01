import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, MapPin, CheckCircle, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { CategoryCard } from '@/components/templates/CategoryCard';
import { useRegion } from '@/contexts/RegionContext';
import { templates, categories } from '@/data/templates';
import { cities, countries, Country, Language } from '@/lib/i18n';

// SEO content for countries
const getCountrySeoContent = (countryCode: Country, countryName: string, language: Language) => {
  const seoTexts: Record<Language, Record<Country, { title: string; description: string; h1: string; intro: string }>> = {
    ru: {
      kz: {
        title: 'Готовые сайты для бизнеса в Казахстане — Yoursite',
        description: 'Купить готовый сайт в Казахстане. Шаблоны для бизнеса с адаптацией и запуском за 24 часа. Оплата в тенге.',
        h1: 'Готовые сайты для бизнеса в Казахстане',
        intro: 'Yoursite — платформа №1 в Казахстане для покупки готовых сайтов. Мы предлагаем более 500 шаблонов для любого бизнеса с адаптацией под казахстанский рынок.',
      },
      uz: {
        title: 'Готовые сайты для бизнеса в Узбекистане — Yoursite',
        description: 'Купить готовый сайт в Узбекистане. Шаблоны для бизнеса с оплатой через Payme и Click. Запуск за 24 часа.',
        h1: 'Готовые сайты для бизнеса в Узбекистане',
        intro: 'Yoursite помогает бизнесу Узбекистана выходить в онлайн с готовыми сайтами. Оплата в сумах, адаптация под узбекский рынок.',
      },
      kg: {
        title: 'Готовые сайты для бизнеса в Кыргызстане — Yoursite',
        description: 'Купить готовый сайт в Кыргызстане. Шаблоны для бизнеса с запуском за 24 часа. Оплата в сомах.',
        h1: 'Готовые сайты для бизнеса в Кыргызстане',
        intro: 'Yoursite — ваш партнёр в создании онлайн-присутствия в Кыргызстане. Готовые сайты с адаптацией под местный рынок.',
      },
    },
    kz: {
      kz: {
        title: 'Қазақстандағы бизнеске арналған дайын сайттар — Yoursite',
        description: 'Қазақстанда дайын сайт сатып алыңыз. 24 сағатта бейімдеу және іске қосу. Теңгемен төлем.',
        h1: 'Қазақстандағы бизнеске арналған дайын сайттар',
        intro: 'Yoursite — Қазақстандағы дайын сайттарды сатып алу үшін №1 платформа. Біз кез келген бизнес үшін 500-ден астам үлгіні ұсынамыз.',
      },
      uz: {
        title: 'Өзбекстандағы бизнеске арналған дайын сайттар — Yoursite',
        description: 'Өзбекстанда дайын сайт сатып алыңыз. Payme және Click арқылы төлем. 24 сағатта іске қосу.',
        h1: 'Өзбекстандағы бизнеске арналған дайын сайттар',
        intro: 'Yoursite Өзбекстан бизнесіне дайын сайттармен онлайн шығуға көмектеседі.',
      },
      kg: {
        title: 'Қырғызстандағы бизнеске арналған дайын сайттар — Yoursite',
        description: 'Қырғызстанда дайын сайт сатып алыңыз. 24 сағатта іске қосу. Соммен төлем.',
        h1: 'Қырғызстандағы бизнеске арналған дайын сайттар',
        intro: 'Yoursite — Қырғызстанда онлайн-қатысуды құруда сіздің серіктесіңіз.',
      },
    },
    uz: {
      kz: {
        title: 'Qozog\'istonda biznes uchun tayyor saytlar — Yoursite',
        description: 'Qozog\'istonda tayyor sayt sotib oling. 24 soat ichida moslashuv va ishga tushirish. Tenge bilan to\'lov.',
        h1: 'Qozog\'istonda biznes uchun tayyor saytlar',
        intro: 'Yoursite — Qozog\'istonda tayyor saytlarni sotib olish uchun №1 platforma.',
      },
      uz: {
        title: 'O\'zbekistonda biznes uchun tayyor saytlar — Yoursite',
        description: 'O\'zbekistonda tayyor sayt sotib oling. Payme va Click orqali to\'lov. 24 soat ichida ishga tushirish.',
        h1: 'O\'zbekistonda biznes uchun tayyor saytlar',
        intro: 'Yoursite O\'zbekiston biznesiga tayyor saytlar bilan onlayn chiqishga yordam beradi. So\'mda to\'lov, o\'zbek bozoriga moslashuv.',
      },
      kg: {
        title: 'Qirg\'izistonda biznes uchun tayyor saytlar — Yoursite',
        description: 'Qirg\'izistonda tayyor sayt sotib oling. 24 soat ichida ishga tushirish. Som bilan to\'lov.',
        h1: 'Qirg\'izistonda biznes uchun tayyor saytlar',
        intro: 'Yoursite — Qirg\'izistonda onlayn mavjudlikni yaratishda sizning hamkoringiz.',
      },
    },
  };

  return seoTexts[language][countryCode];
};

export default function CountryLanding() {
  const { country } = useParams<{ country: string }>();
  const { language, setRegion, t } = useRegion();

  // Validate country
  const validCountry = country as Country;
  const countryCities = cities[validCountry];
  
  if (!countryCities) {
    return <Navigate to="/" replace />;
  }

  const countryName = countries[validCountry].name[language];
  const seoContent = getCountrySeoContent(validCountry, countryName, language);

  // Set region when page loads
  useEffect(() => {
    if (validCountry) {
      setRegion(validCountry);
    }
  }, [validCountry, setRegion]);

  const popularTemplates = templates.slice(0, 6);
  const popularCategories = categories.slice(0, 8);

  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": `Yoursite - ${countryName}`,
    "description": seoContent.description,
    "url": `https://yoursite.kz/${country}`,
    "areaServed": {
      "@type": "Country",
      "name": countryName,
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
    ],
  };

  return (
    <>
      <Helmet>
        <title>{seoContent.title}</title>
        <meta name="description" content={seoContent.description} />
        <link rel="canonical" href={`https://yoursite.kz/${country}`} />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="ru" href={`https://yoursite.kz/${country}`} />
        <link rel="alternate" hrefLang="kk" href={`https://yoursite.kz/${country}`} />
        <link rel="alternate" hrefLang="uz" href={`https://yoursite.kz/${country}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoContent.title} />
        <meta property="og:description" content={seoContent.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yoursite.kz/${country}`} />
        
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
                <li className="text-foreground font-medium">{countryName}</li>
              </ol>
            </nav>

            <div className="mx-auto max-w-4xl text-center">
              {/* Location Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{countryName}</span>
              </div>

              {/* H1 Title */}
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {seoContent.h1.includes(countryName) ? (
                  <>
                    {seoContent.h1.split(countryName)[0]}
                    <span className="text-gradient-primary">{countryName}</span>
                  </>
                ) : (
                  seoContent.h1
                )}
              </h1>

              {/* Intro */}
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

        {/* Cities Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {language === 'ru' && `Города ${countryName}`}
                {language === 'kz' && `${countryName} қалалары`}
                {language === 'uz' && `${countryName} shaharlari`}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {language === 'ru' && 'Выберите ваш город для локализованных предложений'}
                {language === 'kz' && 'Жергілікті ұсыныстар үшін қалаңызды таңдаңыз'}
                {language === 'uz' && 'Mahalliy takliflar uchun shahringizni tanlang'}
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 md:grid-cols-3">
              {countryCities.map((cityItem) => (
                <Link
                  key={cityItem.slug}
                  to={`/${country}/${cityItem.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 shadow-lg transition-all hover:border-primary/50 hover:shadow-xl"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium group-hover:text-primary transition-colors">
                    {cityItem.name[language]}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
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

        {/* Popular Templates */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  {t.popular.title}
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-primary opacity-90" />
          
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

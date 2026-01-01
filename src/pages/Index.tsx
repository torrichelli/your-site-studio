import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Shield, Star, Users, BarChart3, CheckCircle, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { CategoryCard } from '@/components/templates/CategoryCard';
import { useRegion } from '@/contexts/RegionContext';
import { templates, categories } from '@/data/templates';

export default function Index() {
  const { t, getCityName, city } = useRegion();

  const popularTemplates = templates.slice(0, 6);
  const popularCategories = categories.slice(0, 8);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24 md:py-36">
        {/* Animated blur blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blur-blob-primary absolute -left-32 -top-32 h-[500px] w-[500px]" style={{ animationDelay: '0s' }} />
          <div className="blur-blob-accent absolute -right-32 top-1/4 h-[400px] w-[400px]" style={{ animationDelay: '2s' }} />
          <div className="blur-blob-primary absolute bottom-0 left-1/3 h-[300px] w-[300px]" style={{ animationDelay: '4s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(79,70,229,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(79,70,229,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container relative">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 backdrop-blur-sm animate-fade-up">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary">
                Платформа готовых сайтов №1 в Центральной Азии
              </span>
            </div>

            {/* Title with city highlight */}
            <h1 className="font-extrabold tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t.hero.titleCity}{' '}
              <span className="city-highlight text-gradient-primary">{getCityName(city)}</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-xl font-medium text-muted-foreground md:text-2xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/catalog">
                <Button variant="hero" size="xl" className="gap-2 px-10">
                  {t.hero.cta}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="hero-secondary" size="xl" className="gap-2">
                <Play className="h-5 w-5 fill-current" />
                {t.hero.demo}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <span className="font-semibold text-foreground">Без брифов</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                  <Zap className="h-5 w-5 text-warning" />
                </div>
                <span className="font-semibold text-foreground">Запуск за 24 часа</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold text-foreground">Гарантия качества</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="mb-14 text-center">
            <h2 className="text-gradient-primary inline-block">
              {t.categories.title}
            </h2>
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              {t.categories.subtitle}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {popularCategories.map((category, index) => (
              <div key={category.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative bg-muted/30 py-24 md:py-32 overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.03)_0%,transparent_70%)]" />

        <div className="container relative">
          <div className="mb-20 text-center">
            <h2>{t.howItWorks.title}</h2>
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="group relative text-center">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-primary text-4xl font-extrabold text-primary-foreground shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(79,70,229,0.4)]">
                1
              </div>
              <h3 className="text-xl font-extrabold">
                {t.howItWorks.step1.title}
              </h3>
              <p className="mt-3 text-muted-foreground font-medium">
                {t.howItWorks.step1.desc}
              </p>
              {/* Connector line */}
              <div className="absolute right-0 top-12 hidden h-1 w-1/2 bg-gradient-to-r from-primary to-transparent md:block" />
            </div>

            {/* Step 2 */}
            <div className="group relative text-center">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-accent text-4xl font-extrabold text-accent-foreground shadow-accent-glow transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(16,185,129,0.4)]">
                2
              </div>
              <h3 className="text-xl font-extrabold">
                {t.howItWorks.step2.title}
              </h3>
              <p className="mt-3 text-muted-foreground font-medium">
                {t.howItWorks.step2.desc}
              </p>
              {/* Connector lines */}
              <div className="absolute left-0 top-12 hidden h-1 w-1/2 bg-gradient-to-l from-accent to-transparent md:block" />
              <div className="absolute right-0 top-12 hidden h-1 w-1/2 bg-gradient-to-r from-accent to-transparent md:block" />
            </div>

            {/* Step 3 */}
            <div className="group relative text-center">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-primary text-4xl font-extrabold text-primary-foreground shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(79,70,229,0.4)]">
                3
              </div>
              <h3 className="text-xl font-extrabold">
                {t.howItWorks.step3.title}
              </h3>
              <p className="mt-3 text-muted-foreground font-medium">
                {t.howItWorks.step3.desc}
              </p>
              {/* Connector line */}
              <div className="absolute left-0 top-12 hidden h-1 w-1/2 bg-gradient-to-l from-primary to-transparent md:block" />
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/catalog">
              <Button variant="gradient" size="lg" className="gap-2 px-10">
                {t.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Templates Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2>{t.popular.title}</h2>
              <p className="mt-4 text-lg font-medium text-muted-foreground">
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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {popularTemplates.map((template, index) => (
              <div key={template.id} className="animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <TemplateCard template={template} />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
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
      <section className="bg-muted/30 py-24 md:py-32">
        <div className="container">
          <div className="mb-16 text-center">
            <h2>{t.trust.title}</h2>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="group rounded-3xl border border-border/50 bg-card p-10 text-center shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-5xl font-extrabold text-primary tracking-tight">500+</div>
              <p className="mt-3 text-muted-foreground font-medium">{t.trust.sites}</p>
            </div>

            <div className="group rounded-3xl border border-border/50 bg-card p-10 text-center shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="text-5xl font-extrabold text-accent tracking-tight">1200+</div>
              <p className="mt-3 text-muted-foreground font-medium">{t.trust.clients}</p>
            </div>

            <div className="group rounded-3xl border border-border/50 bg-card p-10 text-center shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-warning/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-warning/20">
                <Star className="h-8 w-8 text-warning" />
              </div>
              <div className="text-5xl font-extrabold text-warning tracking-tight">4.9</div>
              <p className="mt-3 text-muted-foreground font-medium">{t.trust.rating}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-white">
              {t.cta.title}
            </h2>
            <p className="mt-6 text-xl font-medium text-white/80">
              {t.cta.subtitle}
            </p>
            <div className="mt-12">
              <Link to="/catalog">
                <Button 
                  size="xl" 
                  className="gap-2 bg-white text-primary shadow-xl hover:bg-white/90 hover:shadow-2xl hover:scale-105 font-bold px-12"
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
  );
}
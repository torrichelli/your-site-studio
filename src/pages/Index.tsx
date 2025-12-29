import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, Clock, Shield, Star, Users, BarChart3, CheckCircle } from 'lucide-react';
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
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">
                Платформа готовых сайтов №1 в Центральной Азии
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              {t.hero.titleCity}{' '}
              <span className="text-gradient-primary">{getCityName(city)}</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              {t.hero.subtitle}
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

      {/* Categories Section */}
      <section className="py-20 md:py-28">
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

      {/* How it Works Section */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              {t.howItWorks.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary text-3xl font-bold text-primary-foreground shadow-glow">
                1
              </div>
              <h3 className="font-display text-xl font-semibold">
                {t.howItWorks.step1.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t.howItWorks.step1.desc}
              </p>
              {/* Connector line - hidden on mobile */}
              <div className="absolute right-0 top-10 hidden h-0.5 w-1/2 bg-gradient-to-r from-primary/50 to-transparent md:block" />
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-accent text-3xl font-bold text-accent-foreground shadow-accent-glow">
                2
              </div>
              <h3 className="font-display text-xl font-semibold">
                {t.howItWorks.step2.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t.howItWorks.step2.desc}
              </p>
              {/* Connector lines */}
              <div className="absolute left-0 top-10 hidden h-0.5 w-1/2 bg-gradient-to-l from-accent/50 to-transparent md:block" />
              <div className="absolute right-0 top-10 hidden h-0.5 w-1/2 bg-gradient-to-r from-accent/50 to-transparent md:block" />
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary text-3xl font-bold text-primary-foreground shadow-glow">
                3
              </div>
              <h3 className="font-display text-xl font-semibold">
                {t.howItWorks.step3.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {t.howItWorks.step3.desc}
              </p>
              {/* Connector line */}
              <div className="absolute left-0 top-10 hidden h-0.5 w-1/2 bg-gradient-to-l from-primary/50 to-transparent md:block" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/catalog">
              <Button variant="gradient" size="lg" className="gap-2">
                {t.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Templates Section */}
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
  );
}

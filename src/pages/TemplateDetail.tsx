import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Eye, ShoppingCart, Check, Smartphone, Monitor, Tablet, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { useRegion } from '@/contexts/RegionContext';
import { getTemplateBySlug, templates } from '@/data/templates';

export default function TemplateDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, formatPrice, t, getCityName, city } = useRegion();

  const template = getTemplateBySlug(slug || '');
  const relatedTemplates = templates.filter(t => t.category === template?.category && t.id !== template?.id).slice(0, 3);

  if (!template) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="font-display text-2xl font-bold">Шаблон не найден</h1>
          <p className="mt-2 text-muted-foreground">Возможно, он был удален или ссылка неверна</p>
          <Link to="/catalog">
            <Button variant="gradient" className="mt-6">
              Вернуться в каталог
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const name = template.name[language] || template.name.ru;
  const description = template.description[language] || template.description.ru;

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="border-b border-border/40 bg-muted/30 py-4">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">{t.nav.home}</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-foreground">{t.catalog.title}</Link>
            <span>/</span>
            <span className="text-foreground">{name}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-8 md:py-12">
        <div className="container">
          <Link to="/catalog" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Назад в каталог
          </Link>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Preview */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-muted">
                {/* Device Switcher */}
                <div className="absolute left-4 top-4 z-10 flex gap-1 rounded-lg border border-border/50 bg-card/90 p-1 backdrop-blur-sm">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute right-4 top-4 z-10 flex gap-2">
                  {template.isNew && (
                    <Badge className="bg-accent text-accent-foreground">NEW</Badge>
                  )}
                  {template.isHot && (
                    <Badge className="bg-destructive text-destructive-foreground">🔥 HOT</Badge>
                  )}
                </div>

                <div className="aspect-video">
                  <img
                    src={template.image}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <button
                    key={i}
                    className="flex-1 overflow-hidden rounded-lg border border-border/50 transition-all hover:border-primary"
                  >
                    <img
                      src={template.image}
                      alt={`${name} screenshot ${i}`}
                      className="aspect-video w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= Math.floor(template.rating) ? 'fill-warning text-warning' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{template.rating}</span>
                <span className="text-muted-foreground">({template.reviewCount} отзывов)</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl font-bold md:text-4xl">{name}</h1>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground">{description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-primary">
                  {formatPrice(template.priceUSD)}
                </span>
                {template.oldPriceUSD && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(template.oldPriceUSD)}
                  </span>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-display font-semibold">Что входит:</h3>
                <ul className="space-y-2">
                  {template.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-success" />
                    <span>Адаптация под ваш бренд</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-success" />
                    <span>Исходный код</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-success" />
                    <span>Техническая поддержка</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="hero" size="xl" className="flex-1 gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Купить сейчас
                </Button>
                <Button variant="hero-secondary" size="xl" className="gap-2">
                  <Eye className="h-5 w-5" />
                  Демо
                </Button>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-2">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" />
                  В избранное
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Поделиться
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Tabs */}
      <section className="border-t border-border/40 py-12">
        <div className="container">
          <Tabs defaultValue="description" className="space-y-8">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="features">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({template.reviewCount})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="prose max-w-none">
              <h2>О шаблоне {name}</h2>
              <p>
                {name} — это современное решение для вашего бизнеса в {getCityName(city)}. 
                Шаблон полностью адаптирован для мобильных устройств и оптимизирован для 
                поисковых систем. Мы поможем настроить его под ваш бренд и запустить 
                за 24 часа.
              </p>
              <h3>Преимущества</h3>
              <ul>
                <li>Адаптивный дизайн для всех устройств</li>
                <li>SEO-оптимизация из коробки</li>
                <li>Высокая скорость загрузки</li>
                <li>Простое управление контентом</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="features">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <h4 className="font-semibold">Технологии</h4>
                  <p className="text-muted-foreground">React, TypeScript, Tailwind CSS</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <h4 className="font-semibold">Адаптивность</h4>
                  <p className="text-muted-foreground">Desktop, Tablet, Mobile</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <h4 className="font-semibold">Скорость загрузки</h4>
                  <p className="text-muted-foreground">95+ PageSpeed Score</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-4">
                  <h4 className="font-semibold">Обновлено</h4>
                  <p className="text-muted-foreground">Декабрь 2024</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="text-center py-12 text-muted-foreground">
                Отзывы скоро появятся
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related */}
      {relatedTemplates.length > 0 && (
        <section className="border-t border-border/40 bg-muted/30 py-12">
          <div className="container">
            <h2 className="mb-8 font-display text-2xl font-bold">Похожие сайты</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTemplates.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

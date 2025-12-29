import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid, List, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { useRegion } from '@/contexts/RegionContext';
import { templates, categories, getTemplatesByCategory } from '@/data/templates';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

export default function Catalog() {
  const { language, t, getCityName, city } = useRegion();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const filteredTemplates = getTemplatesByCategory(selectedCategory).filter(
    (template) => {
      const name = template.name[language] || template.name.ru;
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  );

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.priceUSD - b.priceUSD;
      case 'price-desc':
        return b.priceUSD - a.priceUSD;
      case 'rating':
        return b.rating - a.rating;
      case 'new':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0);
    }
  });

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-4 font-display font-semibold">{t.catalog.category}</h3>
        <div className="space-y-2">
          <div
            className={`flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors ${
              selectedCategory === 'all' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
            }`}
            onClick={() => setSelectedCategory('all')}
          >
            <span>{t.catalog.all}</span>
            <Badge variant="secondary">{templates.length}</Badge>
          </div>
          {categories.map((category) => (
            <div
              key={category.id}
              className={`flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors ${
                selectedCategory === category.slug ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedCategory(category.slug)}
            >
              <span className="flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{category.name[language] || category.name.ru}</span>
              </span>
              <Badge variant="secondary">{category.count}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-4 font-display font-semibold">{t.catalog.price}</h3>
        <div className="space-y-2">
          {[
            { label: 'До 100 000 ₸', value: 'low' },
            { label: '100 000 - 200 000 ₸', value: 'medium' },
            { label: 'Более 200 000 ₸', value: 'high' },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox id={option.value} />
              <label htmlFor={option.value} className="text-sm cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Breadcrumb & Header */}
      <section className="border-b border-border/40 bg-muted/30 py-8">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              {t.nav.home}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t.catalog.title}</span>
          </nav>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold md:text-4xl">
                {t.catalog.title}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {sortedTemplates.length} {t.catalog.results} в {getCityName(city)}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск шаблонов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-2xl border border-border/50 bg-card p-6">
                <h2 className="mb-6 font-display text-lg font-semibold">{t.catalog.filters}</h2>
                <FilterSidebar />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2 lg:hidden">
                      <SlidersHorizontal className="h-4 w-4" />
                      {t.catalog.filters}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>{t.catalog.filters}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Active Filters */}
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                      {categories.find((c) => c.slug === selectedCategory)?.name[language]}
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm text-muted-foreground sm:block">{t.catalog.sort}:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">По популярности</SelectItem>
                      <SelectItem value="new">Сначала новые</SelectItem>
                      <SelectItem value="price-asc">Сначала дешевые</SelectItem>
                      <SelectItem value="price-desc">Сначала дорогие</SelectItem>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Grid */}
              {sortedTemplates.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {sortedTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 text-6xl">🔍</div>
                  <h3 className="font-display text-xl font-semibold">Ничего не найдено</h3>
                  <p className="mt-2 text-muted-foreground">
                    Попробуйте изменить параметры поиска
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {sortedTemplates.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Назад
                    </Button>
                    <Button variant="default" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Далее
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Text Block */}
      <section className="border-t border-border/40 bg-muted/30 py-12">
        <div className="container">
          <div className="prose prose-sm mx-auto max-w-3xl text-muted-foreground">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Готовые сайты для бизнеса в {getCityName(city)}
            </h2>
            <p>
              Выбирайте из нашего каталога готовых сайтов для любой ниши. 
              Все шаблоны адаптированы для мобильных устройств, оптимизированы для SEO 
              и готовы к работе. Мы адаптируем выбранный шаблон под ваш бренд и запустим 
              его за 24 часа без длительных брифов и согласований.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

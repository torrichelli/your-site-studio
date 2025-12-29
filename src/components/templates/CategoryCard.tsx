import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { Category } from '@/data/templates';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { language } = useRegion();

  return (
    <Link
      to={`/catalog?category=${category.slug}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-3xl transition-transform duration-300 group-hover:scale-110">
        {category.icon}
      </div>
      <div className="text-center">
        <h3 className="font-display font-semibold transition-colors group-hover:text-primary">
          {category.name[language] || category.name.ru}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {category.count} сайтов
        </p>
      </div>
    </Link>
  );
}

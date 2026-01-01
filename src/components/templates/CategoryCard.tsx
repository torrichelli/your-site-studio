import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      className="group relative flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-card-hover overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Icon */}
      <div className="relative flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-4xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-accent/10">
        {category.icon}
      </div>
      
      {/* Content */}
      <div className="relative text-center">
        <h3 className="font-extrabold text-lg tracking-tight transition-colors group-hover:text-primary">
          {category.name[language] || category.name.ru}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-muted-foreground">
          {category.count} сайтов
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
        <ArrowRight className="h-5 w-5 text-primary" />
      </div>
    </Link>
  );
}
import { Link } from 'react-router-dom';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRegion } from '@/contexts/RegionContext';
import { Template } from '@/data/templates';

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  const { language, formatPrice, t } = useRegion();

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={template.image}
          alt={template.name[language] || template.name.ru}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          {template.isNew && (
            <Badge className="bg-accent text-accent-foreground">NEW</Badge>
          )}
          {template.isHot && (
            <Badge className="bg-destructive text-destructive-foreground">🔥 HOT</Badge>
          )}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-foreground/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link to={`/site/${template.slug}`}>
            <Button variant="hero-secondary" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              {t.template.preview}
            </Button>
          </Link>
          <Button variant="hero" size="sm" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            {t.template.buy}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="text-sm font-medium">{template.rating}</span>
          <span className="text-xs text-muted-foreground">({template.reviewCount})</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold transition-colors group-hover:text-primary">
          {template.name[language] || template.name.ru}
        </h3>

        {/* Description */}
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {template.description[language] || template.description.ru}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold text-primary">
              {formatPrice(template.priceUSD)}
            </span>
            {template.oldPriceUSD && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(template.oldPriceUSD)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

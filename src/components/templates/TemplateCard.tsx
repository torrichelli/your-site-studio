import { Link } from 'react-router-dom';
import { Star, Eye, ShoppingCart, Sparkles, Cpu } from 'lucide-react';
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
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={template.image}
          alt={template.name[language] || template.name.ru}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {template.isNew && (
            <Badge className="bg-primary text-primary-foreground font-bold shadow-md">
              <Sparkles className="mr-1 h-3 w-3" />
              NEW
            </Badge>
          )}
          {template.isHot && (
            <Badge className="bg-destructive text-destructive-foreground font-bold shadow-md">
              🔥 HOT
            </Badge>
          )}
          <Badge className="bg-accent/90 text-accent-foreground font-bold shadow-md backdrop-blur-sm">
            <Cpu className="mr-1 h-3 w-3" />
            AI-READY
          </Badge>
        </div>

        {/* Quick View Button - Appears on Hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link to={`/site/${template.slug}`}>
            <Button variant="glass-action" size="lg" className="gap-2">
              <Eye className="h-5 w-5" />
              Быстрый просмотр
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Rating */}
        <div className="mb-3 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(template.rating) ? 'fill-warning text-warning' : 'fill-muted text-muted'}`} 
              />
            ))}
          </div>
          <span className="text-sm font-bold text-foreground">{template.rating}</span>
          <span className="text-sm text-muted-foreground">({template.reviewCount})</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-extrabold tracking-tight transition-colors group-hover:text-primary">
          {template.name[language] || template.name.ru}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm font-medium text-muted-foreground">
          {template.description[language] || template.description.ru}
        </p>

        {/* Price & CTA */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-primary tracking-tight">
              {formatPrice(template.priceUSD)}
            </span>
            {template.oldPriceUSD && (
              <span className="text-sm font-medium text-muted-foreground line-through">
                {formatPrice(template.oldPriceUSD)}
              </span>
            )}
          </div>
          <Button variant="buy" size="sm" className="gap-1.5">
            <ShoppingCart className="h-4 w-4" />
            {t.template.buy}
          </Button>
        </div>
      </div>
    </div>
  );
}
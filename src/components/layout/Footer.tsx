import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { Facebook, Instagram, Youtube, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const { t } = useRegion();

  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
                <span className="text-lg font-bold text-primary-foreground">Y</span>
              </div>
              <span className="font-display text-xl font-bold">YOURSITE</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t.footer.description}
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">{t.footer.company}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.footer.careers}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">{t.footer.support}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.footer.help}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.footer.faq}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.contacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">{t.footer.legal}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
            <div className="flex gap-2 pt-2">
              <Input
                type="email"
                placeholder="Email"
                className="h-10"
              />
              <Button size="icon" variant="gradient">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              Powered by CreativeGroup
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

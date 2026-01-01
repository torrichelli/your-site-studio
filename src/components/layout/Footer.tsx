import { Link } from 'react-router-dom';
import { useRegion } from '@/contexts/RegionContext';
import { Facebook, Instagram, Youtube, Linkedin, Send, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const { t, country, getCityName, city } = useRegion();

  // Contact info based on country
  const contactInfo = {
    kz: { phone: '+7 (727) 123-45-67', email: 'info@yoursite.kz' },
    uz: { phone: '+998 71 123-45-67', email: 'info@yoursite.uz' },
    kg: { phone: '+996 312 123-456', email: 'info@yoursite.kg' },
  };

  const contact = contactInfo[country] || contactInfo.kz;

  return (
    <footer className="relative border-t border-border/40 bg-[#0F172A] text-white">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
      
      <div className="container relative py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <span className="text-xl font-extrabold text-white">Y</span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight">YOURSITE</span>
            </Link>
            <p className="text-white/70 font-medium leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-medium">{getCityName(city)}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-medium">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-medium">{contact.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70 transition-all hover:bg-primary hover:text-white hover:shadow-glow">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70 transition-all hover:bg-primary hover:text-white hover:shadow-glow">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70 transition-all hover:bg-primary hover:text-white hover:shadow-glow">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70 transition-all hover:bg-primary hover:text-white hover:shadow-glow">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-5">
            <h4 className="font-extrabold text-lg">{t.footer.company}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 font-medium transition-colors hover:text-primary">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 font-medium transition-colors hover:text-primary">
                  {t.footer.careers}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 font-medium transition-colors hover:text-primary">
                  {t.nav.blog}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-white/70 font-medium transition-colors hover:text-primary">
                  {t.nav.catalog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-5">
            <h4 className="font-extrabold text-lg">{t.footer.support}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-white/70 font-medium transition-colors hover:text-primary">
                  {t.footer.help}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/70 font-medium transition-colors hover:text-primary">
                  {t.footer.faq}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-white/70 font-medium transition-colors hover:text-primary">
                  {t.nav.contacts}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/70 font-medium transition-colors hover:text-primary">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/70 font-medium transition-colors hover:text-primary">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h4 className="font-extrabold text-lg">Подписка на новости</h4>
            <p className="text-white/70 font-medium text-sm">
              Получайте лучшие предложения и новости первыми
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email"
                className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary"
              />
              <Button size="icon" variant="gradient" className="h-11 w-11 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/50 font-medium">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-white/50 font-medium">
              Powered by <span className="text-primary font-bold">CreativeGroup</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
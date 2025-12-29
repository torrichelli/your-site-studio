import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRegion } from '@/contexts/RegionContext';
import { countries, cities, Language, Country } from '@/lib/i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, country, city, setLanguage, setRegion, t, getCityName, getCountryName } = useRegion();

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'Русский' },
    { code: 'kz', label: 'Қазақша' },
    { code: 'uz', label: 'O\'zbekcha' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
            <span className="text-lg font-bold text-primary-foreground">Y</span>
          </div>
          <span className="font-display text-xl font-bold">YOURSITE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.nav.home}
          </Link>
          <Link to="/catalog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.nav.catalog}
          </Link>
          <Link to="/blog" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.nav.blog}
          </Link>
          <Link to="/contacts" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            {t.nav.contacts}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Region Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span>{getCityName(city)}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Выберите регион</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(countries) as Country[]).map((countryCode) => (
                <div key={countryCode}>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">
                    {countries[countryCode].name[language]}
                  </DropdownMenuLabel>
                  {cities[countryCode].map((cityItem) => (
                    <DropdownMenuItem
                      key={cityItem.slug}
                      onClick={() => setRegion(countryCode, cityItem.slug)}
                      className={city === cityItem.slug && country === countryCode ? 'bg-accent' : ''}
                    >
                      {cityItem.name[language]}
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? 'bg-accent' : ''}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>

          <Link to="/auth/login">
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              {t.nav.login}
            </Button>
          </Link>

          <Link to="/catalog">
            <Button variant="gradient" size="sm">
              {t.hero.cta}
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              to="/"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link
              to="/catalog"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.catalog}
            </Link>
            <Link
              to="/blog"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.blog}
            </Link>
            <Link
              to="/contacts"
              className="text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.contacts}
            </Link>
            <div className="flex gap-2 pt-2">
              <Link to="/auth/login" className="flex-1">
                <Button variant="outline" className="w-full">
                  {t.nav.login}
                </Button>
              </Link>
              <Link to="/catalog" className="flex-1">
                <Button variant="gradient" className="w-full">
                  {t.hero.cta}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

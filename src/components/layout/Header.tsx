import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Search, User, MapPin } from 'lucide-react';
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
  const navigate = useNavigate();
  const { language, country, city, setLanguage, setRegion, t, getCityName, getCountryName } = useRegion();

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'Русский' },
    { code: 'kz', label: 'Қазақша' },
    { code: 'uz', label: 'O\'zbekcha' },
  ];

  const handleCitySelect = (countryCode: Country, citySlug: string) => {
    setRegion(countryCode, citySlug);
    navigate(`/${countryCode}/${citySlug}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-18 items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-indigo transition-all duration-300 group-hover:shadow-glow group-hover:scale-105">
            <span className="text-xl font-extrabold text-primary-foreground">Y</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight">YOURSITE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            {t.nav.home}
          </Link>
          <Link to="/catalog" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            {t.nav.catalog}
          </Link>
          <Link to="/blog" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            {t.nav.blog}
          </Link>
          <Link to="/contacts" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            {t.nav.contacts}
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Region Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 font-semibold">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{getCityName(city)}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-card border-border shadow-xl">
              <DropdownMenuLabel className="font-bold">Выберите регион</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {(Object.keys(countries) as Country[]).map((countryCode) => (
                <div key={countryCode}>
                  <DropdownMenuLabel className="text-xs font-bold text-primary uppercase tracking-wide">
                    {countries[countryCode].name[language]}
                  </DropdownMenuLabel>
                  {cities[countryCode].map((cityItem) => (
                    <DropdownMenuItem
                      key={cityItem.slug}
                      onClick={() => handleCitySelect(countryCode, cityItem.slug)}
                      className={`cursor-pointer font-medium ${city === cityItem.slug && country === countryCode ? 'bg-primary/10 text-primary' : ''}`}
                    >
                      <MapPin className="mr-2 h-3.5 w-3.5" />
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
              <Button variant="ghost" size="sm" className="font-bold">
                <Globe className="mr-1.5 h-4 w-4" />
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border shadow-xl">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`cursor-pointer font-medium ${language === lang.code ? 'bg-primary/10 text-primary' : ''}`}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="rounded-xl">
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
          className="md:hidden rounded-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border/40 bg-card md:hidden animate-fade-in">
          <nav className="container flex flex-col gap-4 py-6">
            <Link
              to="/"
              className="text-base font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.home}
            </Link>
            <Link
              to="/catalog"
              className="text-base font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.catalog}
            </Link>
            <Link
              to="/blog"
              className="text-base font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.blog}
            </Link>
            <Link
              to="/contacts"
              className="text-base font-semibold py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav.contacts}
            </Link>
            
            <div className="h-px bg-border my-2" />
            
            {/* Mobile Region/Language */}
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">{getCityName(city)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <span className="font-medium">{language.toUpperCase()}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
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
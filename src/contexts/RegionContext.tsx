import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Country, getTranslations, countries, cities } from '@/lib/i18n';

interface RegionContextType {
  language: Language;
  country: Country;
  city: string;
  currency: string;
  currencySymbol: string;
  setLanguage: (lang: Language) => void;
  setRegion: (country: Country, city?: string) => void;
  t: ReturnType<typeof getTranslations>;
  getCityName: (citySlug: string) => string;
  getCountryName: () => string;
  formatPrice: (priceUSD: number) => string;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

// Exchange rates (simplified - in production would come from API)
const exchangeRates: Record<string, number> = {
  KZT: 450,
  UZS: 12500,
  KGS: 89,
};

export function RegionProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');
  const [country, setCountry] = useState<Country>('kz');
  const [city, setCity] = useState<string>('almaty');

  const countryData = countries[country];
  const t = getTranslations(language);

  useEffect(() => {
    // Load from localStorage
    const savedLang = localStorage.getItem('yoursite_lang') as Language;
    const savedCountry = localStorage.getItem('yoursite_country') as Country;
    const savedCity = localStorage.getItem('yoursite_city');

    if (savedLang && ['ru', 'kz', 'uz'].includes(savedLang)) {
      setLanguage(savedLang);
    }
    if (savedCountry && ['kz', 'uz', 'kg'].includes(savedCountry)) {
      setCountry(savedCountry);
    }
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('yoursite_lang', lang);
  };

  const handleSetRegion = (newCountry: Country, newCity?: string) => {
    setCountry(newCountry);
    localStorage.setItem('yoursite_country', newCountry);
    
    const countryCities = cities[newCountry];
    const cityToSet = newCity || countryCities[0]?.slug || '';
    setCity(cityToSet);
    localStorage.setItem('yoursite_city', cityToSet);
  };

  const getCityName = (citySlug: string): string => {
    const countryCities = cities[country];
    const cityData = countryCities.find(c => c.slug === citySlug);
    return cityData?.name[language] || citySlug;
  };

  const getCountryName = (): string => {
    return countryData.name[language];
  };

  const formatPrice = (priceUSD: number): string => {
    const rate = exchangeRates[countryData.currency] || 1;
    const localPrice = Math.round(priceUSD * rate);
    
    // Psychological pricing
    const rounded = Math.ceil(localPrice / 1000) * 1000 - 10;
    
    return `${rounded.toLocaleString()} ${countryData.currencySymbol}`;
  };

  return (
    <RegionContext.Provider
      value={{
        language,
        country,
        city,
        currency: countryData.currency,
        currencySymbol: countryData.currencySymbol,
        setLanguage: handleSetLanguage,
        setRegion: handleSetRegion,
        t,
        getCityName,
        getCountryName,
        formatPrice,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}

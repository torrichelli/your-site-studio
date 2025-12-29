import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRegion } from '@/contexts/RegionContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contacts() {
  const { t, getCountryName, getCityName, city } = useRegion();

  return (
    <Layout>
      <section className="border-b border-border/40 bg-muted/30 py-12">
        <div className="container">
          <h1 className="font-display text-4xl font-bold">{t.nav.contacts}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Свяжитесь с нами для консультации
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold">Наши контакты</h2>
                <p className="mt-2 text-muted-foreground">
                  Мы готовы ответить на ваши вопросы
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:hello@yoursite.kz" className="text-muted-foreground hover:text-primary">
                      hello@yoursite.kz
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Телефон</h3>
                    <a href="tel:+77001234567" className="text-muted-foreground hover:text-primary">
                      +7 700 123 45 67
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                    <MapPin className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Адрес</h3>
                    <p className="text-muted-foreground">
                      {getCountryName()}, {getCityName(city)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <h3 className="font-display font-semibold">Часы работы</h3>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Понедельник - Пятница</span>
                    <span>09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Суббота</span>
                    <span>10:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Воскресенье</span>
                    <span>Выходной</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-border/50 bg-card p-8">
              <h2 className="font-display text-2xl font-bold">Напишите нам</h2>
              <p className="mt-2 text-muted-foreground">
                Заполните форму и мы свяжемся с вами в ближайшее время
              </p>

              <form className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Имя
                    </label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Телефон
                    </label>
                    <Input id="phone" type="tel" placeholder="+7 700 000 00 00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Сообщение
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Расскажите о вашем проекте..."
                    rows={5}
                  />
                </div>

                <Button variant="gradient" size="lg" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Отправить сообщение
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

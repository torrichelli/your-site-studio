import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useRegion } from '@/contexts/RegionContext';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  const { t } = useRegion();

  const posts = [
    {
      id: 1,
      title: 'Как выбрать идеальный сайт для вашего бизнеса',
      excerpt: 'Подробное руководство по выбору шаблона сайта, который идеально подойдет для вашей ниши и целей.',
      date: '25 декабря 2024',
      category: 'Гайды',
      image: '/placeholder.svg',
    },
    {
      id: 2,
      title: 'Тренды веб-дизайна 2025 года',
      excerpt: 'Какие дизайнерские решения будут популярны в следующем году и как их использовать.',
      date: '20 декабря 2024',
      category: 'Дизайн',
      image: '/placeholder.svg',
    },
    {
      id: 3,
      title: 'SEO-оптимизация: базовые принципы',
      excerpt: 'Узнайте, как сделать ваш сайт видимым для поисковых систем с первого дня.',
      date: '15 декабря 2024',
      category: 'SEO',
      image: '/placeholder.svg',
    },
  ];

  return (
    <Layout>
      <section className="border-b border-border/40 bg-muted/30 py-12">
        <div className="container">
          <h1 className="font-display text-4xl font-bold">{t.nav.blog}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Статьи о веб-дизайне, бизнесе и маркетинге
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3 text-sm">
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground">{post.date}</span>
                  </div>
                  <h2 className="font-display text-xl font-semibold transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.id}`} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Читать далее
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegion } from '@/contexts/RegionContext';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login() {
  const { t } = useRegion();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          {/* Logo */}
          <Link to="/" className="mb-8 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
              <span className="text-xl font-bold text-primary-foreground">Y</span>
            </div>
            <span className="font-display text-2xl font-bold">YOURSITE</span>
          </Link>

          <h1 className="font-display text-3xl font-bold">Добро пожаловать</h1>
          <p className="mt-2 text-muted-foreground">
            Войдите в свой аккаунт через CreativeID
          </p>

          <form className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Пароль</Label>
                <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Забыли пароль?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button variant="gradient" size="lg" className="w-full gap-2">
              Войти
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">или</span>
              </div>
            </div>

            <Button variant="outline" size="lg" className="mt-6 w-full gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                />
              </svg>
              Войти через Google
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Нет аккаунта?{' '}
            <Link to="/auth/register" className="font-medium text-primary hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden flex-1 bg-gradient-primary lg:flex lg:items-center lg:justify-center">
        <div className="max-w-md p-12 text-center text-primary-foreground">
          <div className="mb-8 text-6xl">🚀</div>
          <h2 className="font-display text-3xl font-bold">
            Запустите свой сайт за 24 часа
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Выбирайте из сотен готовых шаблонов и получите профессиональный сайт 
            для вашего бизнеса без долгих согласований
          </p>
        </div>
      </div>
    </div>
  );
}

import Cookie from 'js-cookie';
import { AirVent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { buttonVariants } from './ui/button';

const CheckSigned = () => {
  const token = Cookie.get('auth_token');
  return token ? (
    <Link to={'/dashboard'} className={buttonVariants()}>
      Dashboard
    </Link>
  ) : (
    <Link to={'/login'} className={buttonVariants()}>
      Login
    </Link>
  );
};

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-separate border-b bg-card p-2">
      <nav className="container flex items-center justify-between gap-4">
        <Link to={'/'} className="flex items-center">
          <AirVent className="mr-2 size-5" />
          <h3 className="font-bold text-foreground tracking-tight">Trackino</h3>
        </Link>
        <div className="grow" />
        <ModeToggle />
        <CheckSigned />
      </nav>
    </header>
  );
}

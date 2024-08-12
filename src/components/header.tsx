import { DotsVerticalIcon } from '@radix-ui/react-icons';
import Cookie from 'js-cookie';
import {
  AirVent,
  LayoutDashboard,
  LogOutIcon,
  PieChart,
  Wheat,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { Button, buttonVariants } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const CheckSigned = () => {
  const token = Cookie.get('auth_token');
  return token ? (
    <>
      <Link to={'/dashboard'} className={buttonVariants()}>
        Dashboard
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} size={'icon'}>
            <DotsVerticalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link to={'/dashboard'}>
              <PieChart className="mr-2 size-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to={'/about'}>
              <Wheat className="mr-2 size-4" />
              About
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link
              to={'/sign-out'}
              className="text-rose-500 focus:text-rose-600"
            >
              <LogOutIcon className="mr-2 size-4" />
              Sign Out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
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

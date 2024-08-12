import { Button } from '@/components/ui/button';
import Cookie from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

export function LogOut() {
  const navigate = useNavigate();

  const onSignOut = () => {
    Cookie.remove('auth_token');
    navigate('/');
    location.reload();
  };

  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <section className="flex w-full max-w-sm flex-col items-center justify-center gap-4 rounded-md border px-4 py-8 shadow-sm">
        <div className="text-center">
          <h1 className="font-bold text-2xl/normal">Sign Out</h1>
          <p className="text-muted-foreground text-sm">
            Are you sure to logout your account?
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={onSignOut} variant={'destructive'}>
            Sign Out
          </Button>
          <Button asChild variant={'outline'}>
            <Link to={'/dashboard'}>Cancel</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

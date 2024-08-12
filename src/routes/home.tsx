import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="font-extrabold text-4xl/snug">Vix</h1>
      <p className="font-medium text-muted-foreground">
        Vix: The minimal Full Stack Starter
      </p>
      <Link
        to={'/about'}
        className="mt-4 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground"
      >
        go to about page
      </Link>
    </div>
  );
}

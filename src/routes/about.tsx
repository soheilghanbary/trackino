export function About() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <div className="space-y-2">
        <h1 className="font-black text-4xl">Trackino</h1>
        <p className="font-medium">The minimal Expense Tracker</p>
        <ul>
          <li>
            <span className="text-muted-foreground">Last Updated:</span>{' '}
            {new Date().toLocaleDateString()}
          </li>
          <li>
            <span className="text-muted-foreground">Version:</span> 0.9.1
          </li>
        </ul>
        <h2 className="font-bold text-lg">Stack🔥</h2>
        <ul>
          <li>
            <span className="text-muted-foreground">Language:</span> TypeScript
          </li>
          <li>
            <span className="text-muted-foreground">FrontEnd:</span> React.JS |
            TailwindCSS
          </li>
          <li>
            <span className="text-muted-foreground">BackEnd:</span> Hono.JS
          </li>
          <li>
            <span className="text-muted-foreground">DataBase:</span> PostgreSQL
          </li>
          <li>
            <span className="text-muted-foreground">ORM:</span> Prisma
          </li>
        </ul>
      </div>
    </div>
  );
}

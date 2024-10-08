export default function About() {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center p-4">
      <div className="space-y-2">
        <h1 className="font-black text-4xl">Trackino</h1>
        <p className="font-medium">The minimal Expense Tracker</p>
        <ul>
          <li>
            <span className="text-muted-foreground">Last Updated:</span>{" "}
            {new Date().toLocaleDateString()}
          </li>
          <li>
            <span className="text-muted-foreground">Version:</span> 1.0.1
          </li>
          <li>
            <span className="text-muted-foreground">Developed By:</span> Soheil
            Ghanbary
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

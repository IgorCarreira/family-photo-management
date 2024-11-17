import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Page not found</h1>
      <p className="text-accent-foreground">
        Return to{" "}
        <Link to="/" className="text-green-500">
          Users page
        </Link>
      </p>
    </div>
  );
};

import { Album, Camera, Users } from "lucide-react";
import { useAuth } from "./auth-context";
import { ModeToggle } from "./mode-toggle";
import NavLink from "./nav-link";

export const Header = () => {
  const { user } = useAuth();
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Camera className="size-8 mr-4" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/my-users">
            <Users className="size-5" />
            My users
          </NavLink>
        </nav>

        {user && (
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <NavLink to={`/my-users/${user?.id}/albums`}>
              <Album className="size-5" />
              My albums
            </NavLink>
          </nav>
        )}

        <div className="ml-auto flex items-center gap-8">
          {user && <p className="select-none">Hello, {user.username}!</p>}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

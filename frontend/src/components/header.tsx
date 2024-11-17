import { Camera, Users } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import NavLink from "./nav-link";

export const Header = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6 first:gap-16">
        <Camera className="size-8 " />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/my-users">
            <Users className="size-5" />
            My users
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-8">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

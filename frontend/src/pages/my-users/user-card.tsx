import { User } from "@/types/user";
import { UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface UserCardProps {
  user: User;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`${user.id}/albums`}>
      <div className="flex border rounded p-4 cursor-pointer hover:border-primary items-center gap-4 bg-card">
        <UserIcon className="size-10" />
        <div className="flex flex-col">
          <span className="select-none">{user.username}</span>
          <span className="select-none">{user.email}</span>
        </div>
      </div>
    </Link>
  );
};

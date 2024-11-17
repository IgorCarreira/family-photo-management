import { fetchUsers } from "@/api/users";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { UserCard } from "./user-card";
import { Loader2 } from "lucide-react";

export const MyUsers = () => {
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  return (
    <>
      <Helmet title="My users" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My users</h1>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 xl:grid-cols-4">
            {users?.map((user) => (
              <UserCard user={user} key={user.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

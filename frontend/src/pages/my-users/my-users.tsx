import { fetchUsers } from "@/api/users";
import { useAuth } from "@/components/auth-context";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { UserCard } from "./user-card";

export const MyUsers = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: () => !queryClient.getQueryData(["users"]),
  });

  useEffect(() => {
    if (users && users.length > 0) {
      setUser(users[0]);
    }
  }, [users, setUser]);

  return (
    <>
      <Helmet title="My users" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My users</h1>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <Loader2 className="animate-spin" />
            <p className="text-muted-foreground">
              Our servers are waking up, please wait a moment...
            </p>
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

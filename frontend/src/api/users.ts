import { apiUrl } from "./url";

export const fetchUsers = async () => {
  const response = await fetch(`${apiUrl}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

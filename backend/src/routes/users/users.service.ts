import { User } from "../../types/users.types";

export async function getUsers(): Promise<User[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await response.json()) as User[];
  return users.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
  }));
}

export async function getUserById(userId: number): Promise<User> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const user = (await response.json()) as User;
  return { id: user.id, email: user.email, username: user.username };
}

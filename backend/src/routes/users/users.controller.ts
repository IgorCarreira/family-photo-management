import { FastifyReply, FastifyRequest } from "fastify";
import { getUsers } from "./users.service";

export async function getUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await getUsers();
    return reply.status(200).send(users);
  } catch (error) {
    return reply.status(500).send({ error: "Failed to fetch users" });
  }
}

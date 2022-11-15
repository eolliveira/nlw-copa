import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(fastify: FastifyInstance) {
  //CONTAGEM DE USUÁRIOS
  fastify.get("/user/count", async () => {
    const count = await prisma.user.count();
    return { count };
  });
}

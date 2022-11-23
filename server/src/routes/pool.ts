import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";
import ShortUniqueId from "short-unique-id";

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  //criar bolão
  fastify.post("/pools", async (request, reply) => {
    //define que pool é um obj
    const createPoolBody = z.object({
      //title tipo string e não é nulo
      title: z.string(),
    });

    //retorna resposta , passando pela validação
    const { title } = createPoolBody.parse(request.body);

    const generate = new ShortUniqueId({ length: 6 });
    const code = String(generate()).toUpperCase();

    //se usuário não estiver altenticado(app web) , vai criar bolão sem owner
    //se estiver altenticado(app mobile) cria bolão com owner , e adiciona como participante

    try {
      await request.jwtVerify();
      //usuário altenticado

      await prisma.pool.create({
        data: {
          title,
          code,
          //pega o id do usuário contido dentro dentro do token passado na requisição
          ownerId: request.user.sub,
          participants: {
            create: {
              userId: request.user.sub,
            },
          },
        },
      });
    } catch (error) {
      //usuário não altenticado

      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });
    }

    return reply.status(201).send({ code });
  });
}

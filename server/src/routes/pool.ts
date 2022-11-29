import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import z from "zod";
import ShortUniqueId from "short-unique-id";
import { authenticate } from "../plugins/authenticate";

export async function poolRoutes(fastify: FastifyInstance) {
  //retonar numero de bolões criados
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
      //usuário não alt enticado

      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });
    }

    return reply.status(201).send({ code });
  });

  //inclui novo participante
  fastify.post(
    "/pools/join",
    {
      onRequest: [authenticate],
    },
    async (request, reply) => {
      const joinPoolBody = z.object({
        //title tipo string e não é nulo
        code: z.string(),
      });

      const { code } = joinPoolBody.parse(request.body);

      ///verifica se bolão existe
      const pool = await prisma.pool.findUnique({
        where: {
          code,
        },
        include: {
          participants: {
            where: {
              userId: request.user.sub,
            },
          },
        },
      });

      //se bolão não existir
      if (!pool) {
        return reply.status(400).send({
          message: "Pool not found!",
        });
      }

      //verifica se usuário logado ja faz parte do bolão
      if (pool.participants.length > 0) {
        return reply.status(400).send({
          message: "User is already included in the pool",
        });
      }

      //se o bolão foi criado pela web sem dono, o primeiro participante será o dono(medida alternativa)
      if (!pool.ownerId) {
        await prisma.pool.update({
          where: {
            id: pool.id,
          },
          data: {
            ownerId: request.user.sub,
          },
        });
      }

      //inclui participante
      await prisma.participant.create({
        data: {
          poolId: pool.id,
          userId: request.user.sub,
        },
      });

      return reply.status(201).send();
    }
  );

  //retona bolões que o usuário logado esta incluido
  fastify.get(
    "/pools",
    { onRequest: [authenticate] },
    async (request) => {

      const pools = await prisma.pool.findMany({
        where: {
          participants: {
            //onde pelo menos 1
            some: {
              userId: request.user.sub,
            },
          },
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              participants: true,
            },
          },
          participants: {
            //traz só os 4 primeiros registros
            take: 4,
            select: {
              id: true,
              user: {
                select: {
                  avatarUrl: true,
                },
              },
            },
          },
        },
      });

      return { pools };
    }
  );

  //detalhes de um bolão
  fastify.get(
    "/pools/:id",
    { onRequest: [authenticate] },
    async (request) => {
      const getPoolParams = z.object({
        id: z.string(),
      });

      //pega id passado na url
      const { id } = getPoolParams.parse(request.params);

      const pools = await prisma.pool.findUnique({
        where: {
          id,
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: {
              participants: true,
            },
          },
          participants: {
            //traz só os 4 primeiros registros
            take: 4,
            select: {
              id: true,
              user: {
                select: {
                  avatarUrl: true,
                },
              },
            },
          },
        },
      });

      return { pools };
    }
  );
}

import { FastifyInstance } from "fastify";
import z, { oboolean } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function gameRoutes(fastify: FastifyInstance) {
  //lista games do bolão informado
  fastify.get(
    "/pool/:id/games",
    { onRequest: [authenticate] },
    async (request, reply) => {
      //define que pool é um obj
      const getPoolParams = z.object({
        //title tipo string e não é nulo
        id: z.string(),
      });

      const { id } = getPoolParams.parse(request.params);

      const games = await prisma.game.findMany({
        orderBy: {
          date: "desc",
        },
        //traz junto os palpites do usuário logado
        include: {
          guesses: {
            where: {
              participant: {
                userId: request.user.sub,
                poolId: id,
              },
            },
          },
        },
      });

      return {
        games: games.map((game) => {
          return {
            ...game,
            //se usuário não tiver palpite retorna null, se não retorna o primeiro da lista
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined,
          };
        }),
      };
    }
  );
}

import { FastifyInstance } from "fastify";
import z, { date } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function guessRoutes(fastify: FastifyInstance) {
  //CONTAGEM DE PALPITES
  fastify.get("/guesses/count", async () => {
    const count = await prisma.guess.count();

    return { count };
  });

  //cria um palpite
  fastify.post(
    "/pools/:poolId/games/:gameId/guesses",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const createGuessParams = z.object({
        poolId: z.string(),
        gameId: z.string(),
      });

      const createGuessBody = z.object({
        firstTeamPoints: z.number(),
        SecondTeamPoints: z.number(),
      });

      const { poolId, gameId } = createGuessParams.parse(request.params);
      const { firstTeamPoints, SecondTeamPoints } = createGuessBody.parse(
        request.body
      );

      //verifica se usuário logado participa do bolão
      const participant = await prisma.participant.findUnique({
        where: {
          userId_poolId: {
            poolId,
            userId: request.user.sub,
          },
        },
      });

      if (!participant) {
        return reply.status(400).send({
          message: "Voce não participa deste bolão",
        });
      }

      //verifica se usuário logado ja palpitou nesse jogo, neste mesmo bolão
      const guess = await prisma.guess.findUnique({
        where: {
          participantId_gameId: {
            gameId,
            participantId: participant.userId,
          },
        },
      });

      //procura pelo game
      const game = await prisma.game.findUnique({
        where: {
          id: gameId,
        },
      });

      if (!game) {
        return reply.status(400).send({
          message: "Jogo não existe!",
        });
      }

      ///verifica se o jogo ja não ocorreu
      if (game.date < new Date()) {
        return reply.status(400).send({
          message: "Palpites para esse jogo, ja foram encerradas",
        });
      }

      //cria palpite
      await prisma.guess.create({
        data: {
          gameId,
          participantId: participant.id,
          firstTeamPoints,
          SecondTeamPoints,
        },
      });

      return reply.status(201).send();
    }
  );
}

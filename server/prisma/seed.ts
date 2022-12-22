import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.create({
    data: {
      name: "Erick Oliveira",
      email: 'jhon2@gmail.com',
      avatarUrl: "https://github.com/eolliveira.png",
    },
  })

  const pool = await prisma.pool.create({
    data: {
      title: "Bolão da Empresa",
      code: "BOLOA123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-12-25T02:27:29.848Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-12-25T02:27:29.848Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 3,
          SecondTeamPoints: 0,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main()

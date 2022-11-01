//equivalente o express
import { Prisma, PrismaClient } from "@prisma/client";
import Fastify from "fastify";

//log de sql
const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get("/pools/count", async () => {
    const pools = await prisma.pool.findMany({
      where: {
        title: {
          startsWith: 'B'
        }
      }
    })

    return { pools } 
  });

  await fastify.listen({ port: 3000 });
}

//função start projeto
bootstrap();

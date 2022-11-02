//equivalente o express
import { Prisma, PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import cors from '@fastify/cors'

//log de sql
const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });


  //define o cors da aplicação como publico 
  await fastify.register(cors , {
    origin: true
  })

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count(); 

    return { count } 
  });

  await fastify.listen({ port: 3000, host: '0.0.0.0' });
}

//função start projeto
bootstrap();

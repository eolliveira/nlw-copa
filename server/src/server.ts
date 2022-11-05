//equivalente o express
import { Prisma, PrismaClient } from "@prisma/client";
import Fastify from "fastify";
import cors from "@fastify/cors";
import z from 'zod';

//log de sql
const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  //define o cors da aplicação como publico
  await fastify.register(cors, {
    origin: true,
  });

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
    })

    //retorna resposta , passando pela validação
    const { title } = createPoolBody.parse(request.body)







    return reply.status(201).send({ title });
  });










  await fastify.listen({ port: 8080 });
}

//função start projeto
bootstrap();

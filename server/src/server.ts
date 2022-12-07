import Fastify from "fastify";
import cors from "@fastify/cors";
import { poolRoutes } from "./routes/pool";
import { gameRoutes } from "./routes/game";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import { guessRoutes } from "./routes/guess";
import jwt from "@fastify/jwt";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  //define o cors da aplicação como publico
  await fastify.register(cors, {
    origin: true,
  });


  //criar variavel de teste em produção 
  await fastify.register(jwt, {
    secret: 'nlwcopa'
  });

  //registra rotas
  await fastify.register(poolRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(authRoutes);
  await fastify.register(userRoutes);
  await fastify.register(gameRoutes);

  //host: '0.0.0.0' = necessário para ambiente de desenv android 
  await fastify.listen({ port: 8080, host: '0.0.0.0' });
}

//função start projeto
bootstrap();

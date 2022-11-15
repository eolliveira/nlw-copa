import Fastify from "fastify";
import cors from "@fastify/cors";
import { poolRoutes } from "./routes/pool";
import { gameRoutes } from "./routes/game";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import { guessRoutes } from "./routes/guess";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  //define o cors da aplicação como publico
  await fastify.register(cors, {
    origin: true,
  });

  //registra rotas
  await fastify.register(poolRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(authRoutes);
  await fastify.register(userRoutes);
  await fastify.register(gameRoutes);

  await fastify.listen({ port: 8080 });
}

//função start projeto
bootstrap();

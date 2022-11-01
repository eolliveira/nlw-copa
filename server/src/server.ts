import Fastify from 'fastify';

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });


  await fastify.get("/pools/count", () => {
    return { count: 1000 };
  });

  await fastify.listen({ port: 3000 });
}

//função start projeto
bootstrap();

import { FastifyRequest } from "fastify";

export async function authenticate(request: FastifyRequest) {
  //verifica se tem um token passado no header
  await request.jwtVerify();
}

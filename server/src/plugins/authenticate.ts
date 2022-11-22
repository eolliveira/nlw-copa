import { FastifyRequest } from "fastify";

export async function authenticate(request: FastifyRequest) {
  //veriofica se tem um token passado no header
  await request.jwtVerify();
}

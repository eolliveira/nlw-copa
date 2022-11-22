import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/users", async (response) => {
    //verifica se retorna um token
    const createUserBody = z.object({
      //passa o token vindo do app
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(response.body);

    //comunica com api do google(obtem dados do usuário)
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    //retona json de resposta
    const userData = await userResponse.json();

    ///valida retono da resposta
    const userInfoSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string().email(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    //verifica se usuário ja existe no banco de dados
    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    //cria usuário se não existir
    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      });
    }

    //gera token adicionando informações ao mesmo
    const token = fastify.jwt.sign(
      {
        name: userInfo.name,
        picture: userInfo.picture,
      },
      {
        //quem gerou o token
        sub: userInfo.id,
        expiresIn: "1 day",
      }
    );

    return { token };
  });
}

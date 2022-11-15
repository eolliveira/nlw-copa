//equivalente o express
import { PrismaClient } from "@prisma/client";

//log de sql
export const prisma = new PrismaClient({
  log: ["query"],
});

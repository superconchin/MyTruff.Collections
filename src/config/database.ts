import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { PrismaClient as BasePrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const PrismaClient = BasePrismaClient;

declare module 'fastify' {
  interface FastifyInstance {
    prisma: InstanceType<typeof BasePrismaClient>;
  }
}

const prismaPlugin = async (fastify: FastifyInstance) => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is required to connect Prisma.');
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
    }),
  });

  await prisma.$connect();

  // Decoramos la instancia para acceder con fastify.prisma
  fastify.decorate('prisma', prisma);

  // Cerramos la conexión limpiamente al apagar el servidor
  fastify.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
};

export default fp(prismaPlugin);
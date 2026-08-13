import Fastify from 'fastify';
import prismaPlugin from './config/database.js';
import { userRoutes } from './routes/user.routes.js';
import "dotenv/config";

const fastify = Fastify({ logger: true });

const start = async () => {
  try {
    await fastify.register(prismaPlugin);

    await fastify.register(userRoutes, { prefix: '/api' });

    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

import Fastify from 'fastify';
import prismaPlugin from './config/database.js';
import { userRoutes } from './routes/user.routes.js';

const fastify = Fastify({ logger: true });

const start = async () => {
  try {
    // 1. Registrar base de datos primero
    await fastify.register(prismaPlugin);

    // 2. Registrar módulos de rutas
    await fastify.register(userRoutes, { prefix: '/api' });

    // 3. Levantar servidor
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: '0.0.0.0' });
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

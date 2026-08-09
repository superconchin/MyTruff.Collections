import { FastifyRequest, FastifyReply } from 'fastify';

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const users = await request.server.prisma.user.findMany();
  return reply.send(users);
};

export const createUser = async (
  request: FastifyRequest<{ Body: { email: string; name?: string } }>,
  reply: FastifyReply
) => {
  const { email, name } = request.body;
  
  const newUser = await request.server.prisma.user.create({
    data: { email, name },
  });

  return reply.code(201).send(newUser);
};
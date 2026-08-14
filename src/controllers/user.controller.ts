import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/user.model.js';

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const users = await request.server.prisma.user.findMany();
  return reply.send(users);
};

export const createUser = async (
  request: FastifyRequest<{ Body: User }>,
  reply: FastifyReply
) => {
  const user: User = request.body;

  if (!user?.email) {
    return reply.code(400).send({
      error: 'Email is required',
      received: request.body,
    });
  }

  const newUser = await request.server.prisma.user.create({
    data: {
      company: user.company ?? undefined,
      email: user.email,
      phonenumber:
        user.phonenumber != null
          ? String(user.phonenumber)
          : user.phone != null
            ? String(user.phone)
            : undefined,
      role: user.role != null ? String(user.role) : undefined,
      name: user.name ?? undefined,
      lastname: user.lastname ?? user.lastName ?? undefined,
      password: user.password ? String(user.password) : undefined,
    },
  });

  return reply.code(201).send(newUser);
};

export const getUserById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const user = await request.server.prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return reply.send(user);
};

export const updateUser = async (
  request: FastifyRequest<{ Params: { id: string }; Body: User }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  const user: User = request.body;

  const updatedUser = await request.server.prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      company: user.company ?? undefined,
      email: user.email,
      phonenumber:
        user.phonenumber != null
          ? String(user.phonenumber)
          : user.phone != null
            ? String(user.phone)
            : undefined,
      role: user.role != null ? String(user.role) : undefined,
      name: user.name ?? undefined,
      lastname: user.lastname ?? user.lastName ?? undefined,
      password: user.password ? String(user.password) : undefined,
    },
  });

  return reply.send(updatedUser);
};

export const deleteUser = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  const { id } = request.params;
  await request.server.prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  return reply.code(200).send({ message: 'User deleted successfully' });
};
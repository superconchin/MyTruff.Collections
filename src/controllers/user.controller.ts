import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/user.model.js';

const toJsonSafeUser = (user: any) => ({
  ...user,
  phonenumber:
    user?.phonenumber !== null && user?.phonenumber !== undefined
      ? user.phonenumber.toString()
      : null,
});

const toBigInt = (value: bigint | number | string | null | undefined): bigint => {
  if (value === null || value === undefined) {
    throw new Error('phonenumber is required and must be a valid bigint-compatible value');
  }

  return typeof value === 'bigint' ? value : BigInt(String(value));
};

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const users = await request.server.prisma.user.findMany();
  return reply.send(users.map(toJsonSafeUser));
};

export const createUser = async (
  request: FastifyRequest<{ Body: User }>,
  reply: FastifyReply
) => {
  const user: User = request.body;

  if (!user?.email || !user.company || !user.name || user.role == null || user.phonenumber == null || !user.password) {
    return reply.code(400).send({
      error: 'company, email, phonenumber, role, name and password are required',
      received: request.body,
    });
  }

  const newUser = await request.server.prisma.user.create({
    data: {
      company: String(user.company),
      email: user.email,
      phonenumber: toBigInt(user.phonenumber),
      role: Number(user.role),
      name: String(user.name),
      lastname: user.lastname ?? user.lastName ?? null,
      password: String(user.password),
    },
  });

  return reply.code(201).send(toJsonSafeUser(newUser));
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

  if (!user) {
    return reply.code(404).send({ message: 'User not found' });
  }

  return reply.send(toJsonSafeUser(user));
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
      company: user.company != null ? String(user.company) : undefined,
      email: user.email,
      phonenumber: user.phonenumber != null ? toBigInt(user.phonenumber) : undefined,
      role: user.role != null ? Number(user.role) : undefined,
      name: user.name != null ? String(user.name) : undefined,
      lastname: user.lastname ?? user.lastName ?? undefined,
      password: user.password != null ? String(user.password) : undefined,
    },
  });

  return reply.send(toJsonSafeUser(updatedUser));
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
import { FastifyInstance } from 'fastify';
import { getUsers, createUser, deleteUser } from '../controllers/user.controller.js';

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users', getUsers);
  fastify.post('/users', createUser);
  fastify.delete('/users/:id', deleteUser);
};
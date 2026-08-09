import { FastifyInstance } from 'fastify';
import { getUsers, createUser } from '../controllers/user.controller.js';

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users', getUsers);
  fastify.post('/users', createUser);
};
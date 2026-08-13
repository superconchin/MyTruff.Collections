import { FastifyInstance } from 'fastify';
import { getUsers, createUser, getUserById } from '../controllers/user.controller.js';

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users', getUsers);
  fastify.post('/users', createUser);
};
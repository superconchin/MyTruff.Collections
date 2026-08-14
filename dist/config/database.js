"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const PrismaClient = client_1.PrismaClient;
const prismaPlugin = async (fastify) => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL is required to connect Prisma.');
    }
    const prisma = new PrismaClient({
        adapter: new adapter_pg_1.PrismaPg({
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
exports.default = (0, fastify_plugin_1.default)(prismaPlugin);

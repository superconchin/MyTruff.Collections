"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const database_js_1 = __importDefault(require("./config/database.js"));
const user_routes_js_1 = require("./routes/user.routes.js");
require("dotenv/config");
const fastify = (0, fastify_1.default)({ logger: true });
const start = async () => {
    try {
        await fastify.register(database_js_1.default);
        await fastify.register(user_routes_js_1.userRoutes, { prefix: '/api' });
        const port = Number(process.env.PORT) || 3000;
        await fastify.listen({ port, host: '0.0.0.0' });
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_controller_js_1 = require("../controllers/user.controller.js");
const userRoutes = async (fastify) => {
    fastify.get('/users', user_controller_js_1.getUsers);
    fastify.post('/users', user_controller_js_1.createUser);
};
exports.userRoutes = userRoutes;

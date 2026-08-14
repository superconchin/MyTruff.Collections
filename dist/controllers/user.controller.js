"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
const getUsers = async (request, reply) => {
    const users = await request.server.prisma.user.findMany();
    return reply.send(users);
};
exports.getUsers = getUsers;
const createUser = async (request, reply) => {
    const user = request.body;
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
            phonenumber: user.phonenumber != null
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
exports.createUser = createUser;

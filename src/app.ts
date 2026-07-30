import Fastify from "fastify";
import jwt from "@fastify/jwt";

import userRoutes from "./routes/user.routes";

const app = Fastify();

app.register(jwt,{
    secret: process.env.JWT_SECRET!
});

app.register(userRoutes,{
    prefix:"/api/v1/users"
});

export default app;
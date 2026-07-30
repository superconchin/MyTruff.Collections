import { FastifyInstance } from "fastify";

import * as controller from "../controllers/user.controller";

export default async function(app:FastifyInstance){

    app.get("/",controller.list);

    app.post("/",controller.create);

}
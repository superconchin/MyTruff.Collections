import { prisma } from "../config/prisma";

export class UserRepository{

    findAll(){

        return prisma.user.findMany();

    }

    findByEmail(email:string){

        return prisma.user.findUnique({
            where:{email}
        });

    }

    create(data:any){

        return prisma.user.create({
            data
        });

    }

}
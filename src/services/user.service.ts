import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";

export class UserService{

    repository = new UserRepository();

    async createUser(data:any){

        const exists = await this.repository.findByEmail(data.email);

        if(exists){

            throw new Error("Email ya registrado");

        }

        data.password = await bcrypt.hash(data.password,10);

        return this.repository.create(data);

    }

}
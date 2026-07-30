import { UserService } from "../services/user.service";

const service = new UserService();

export async function create(request:any){

    return service.createUser(request.body);

}

export async function list(){

    return service.repository.findAll();

}
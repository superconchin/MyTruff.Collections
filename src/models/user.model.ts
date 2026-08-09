import { Roles } from "./roles.model";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role:number;
  company:string;
}
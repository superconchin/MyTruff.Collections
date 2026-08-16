export interface User {
  id?: number;
  name?: string | null;
  email: string;
  password?: string | null;
  role?: number | string | null;
  company?: string | null;
  phonenumber?: bigint | number | string | null;
  lastname?: string | null;
  lastName?: string | null;
}
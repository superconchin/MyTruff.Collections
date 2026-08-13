export interface User {
  id?: number;
  name?: string | null;
  email: string;
  password?: string | null;
  role?: string | number | null;
  company?: string | null;
  phone?: number | string | null;
  phonenumber?: number | string | null;
  lastName?: string | null;
  lastname?: string | null;
}
export interface UserType {
  id: string;
  name?: string | null;
  userName?: string | null;
  email?: string | null;
  age?: number | null;
  code?: number | null;
  role: 'admin' | 'user';
}
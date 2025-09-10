export interface UserType {
  id: string;
  name?: string | null;
  userName?: string | null;
  email?: string | null;
  age?: number | null;
  code?: number | null;
  image?: string | null | undefined;
  role: 'admin' | 'user';
}
import { UserType } from '../modules/Users';
export declare const getAllUsers: (search?: string) => Promise<UserType[]>;
export declare const getUserById: (id: string) => Promise<UserType | null>;
export declare const createUser: (user: Omit<UserType, "id">) => Promise<Record<string, string>>;
export declare const updateUser: (id: string, userData: Omit<UserType, "id">) => Promise<Record<string, string>>;
export declare const deleteUser: (id: string) => Promise<UserType | null>;
//# sourceMappingURL=userServices.d.ts.map
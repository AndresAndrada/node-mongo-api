import mongoose from 'mongoose';
export interface UserType {
    id: string;
    name: string | null | undefined;
    userName: string | null | undefined;
    email: string | null | undefined;
    age: number | null | undefined;
    code: number | null | undefined;
    role?: 'admin' | 'user';
}
export interface User extends UserType {
}
export declare const User: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User, {}, {}> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=Users.d.ts.map
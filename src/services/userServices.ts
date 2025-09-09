import mongoose from 'mongoose';
import { User, UserType } from '../modules/Users';

export const getAllUsers = async (search?: string): Promise<UserType[]> => {
  try {
    const query: any = {};
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: { $regex: searchRegex } },
        { userName: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ];
    }
    const users = await User.find(query).limit(100).exec();
    return users;
  } catch (error) {
    throw new Error(`Error al mostrar usuarios: ${error instanceof Error ? error.message : 'Desconocido'}`);
  }
};

export const getUserById = async (id: string): Promise<UserType | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('ID inválido');
    }
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(`Error al obtener usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
  }
};

export const createUser = async (user: Omit<UserType, 'id'>): Promise<Record<string, string>> => {
  try {
    if (user.email && user.email === '') {
      throw new Error('El email no puede estar vacío');
    }
    if (user.email) {
      const existingUser = await User.findOne({ email: user.email }).exec();
      if (existingUser) {
        throw new Error('El email ya está registrado');
      }
    }
    await User.create({...user});
    return { message: 'Usuario creado correctamente' };
  } catch (error) {
    throw new Error(`Error al crear usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
  }
};

export const updateUser = async (id: string, userData: Omit<UserType, 'id'>): Promise<Record<string, string>> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('ID inválido');
    if (userData.email && userData.email === '') throw new Error('El email no puede estar vacío');
    if (userData.email) {
      const existingUser = await User.findOne({ email: userData.email }).exec();
      if (existingUser) throw new Error('El email ya está registrado');
    }
    const result = await User.updateOne({ _id: id }, { $set: userData }).exec();
    if (result.matchedCount === 0) throw new Error('Usuario no encontrado');
    return { message: 'Usuario modificado correctamente' };
    } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new Error(`Error de validación: ${error?.message}`);
    }
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      throw new Error('El email ya está registrado');
    }
    throw new Error(`Error al actualizar usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
  }
};


export const deleteUser = async (id: string): Promise<UserType | null> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('ID inválido');
    }
    const user = await User.findByIdAndDelete(id).exec();
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
    throw new Error('Error al eliminar usuario: Desconocido');
  }
};
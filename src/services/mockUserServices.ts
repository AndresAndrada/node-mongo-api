import fs from 'fs/promises';
import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../types';

// Importar el archivo JSON y tiparlo
import userData from '../utils/user.json';

// Definir la interfaz para el formato del JSON
interface UsersData {
  users: UserType[];
}

// Asegurarse de que userData cumple con la interfaz
const usersData: UsersData = {
  users: (userData as UsersData).users.map(user => ({
    ...user,
    role: user.role === 'admin' || user.role === 'user' ? user.role : 'user', // Forzar role válido
  })),
};
const USERS_FILE = path.join(__dirname, '../utils/user.json');

// Helper para leer el archivo JSON
const readUsers = async (): Promise<UsersData> => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const parsedData = JSON.parse(data) as UsersData;
    // Validar roles al leer el archivo
    return {
      users: parsedData.users.map(user => ({
        ...user,
        role: user.role === 'admin' || user.role === 'user' ? user.role : 'user',
      })),
    };
  } catch (error) {
    // Si el archivo no existe o está vacío, devolver el JSON inicial
    return usersData;
  }
};

// Helper para escribir en el archivo JSON
const writeUsers = async (data: UsersData): Promise<void> => {
  await fs.writeFile(USERS_FILE, JSON.stringify(data, null, 2));
};

// Obtener todos los usuarios con filtro opcional por texto
export const getAllMockUsers = async (search?: string): Promise<UserType[]> => {
  try {
    const { users } = await readUsers();
    if (!search || !search.trim()) {
      return users;
    }
    const sanitizedSearch = search.trim().toLowerCase();
    return users.filter(
      user =>
        (user.name && user.name.toLowerCase().includes(sanitizedSearch)) ||
        (user.userName && user.userName.toLowerCase().includes(sanitizedSearch)) ||
        (user.email && user.email.toLowerCase().includes(sanitizedSearch))
    );
  } catch (error) {
    throw new Error(`Error al mostrar usuarios: ${error instanceof Error ? error.message : 'Desconocido'}`);
  }
};

// Obtener un usuario por ID
export const getMockUserById = async (id: string): Promise<UserType | null> => {
  try {
    if (!id) {
      throw new Error('ID inválido');
    }
    const { users } = await readUsers();
    const user = users.find(user => user.id === id) || null;
    return user;
  } catch (error) {
    throw new Error(`Error al obtener usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
  }
};

// Crear un nuevo usuario
export const createMockUser = async (user: Omit<UserType, 'id'>): Promise<Record<string, string>> => {
  try {
    if (user.email && user.email === '') {
      throw new Error('El email no puede estar vacío');
    }
    const { users } = await readUsers();
    if (user.email && users.some(u => u.email === user.email)) {
      throw new Error('El email ya está registrado');
    }
    const uniquId = users.length + 1;
    const findId = users.filter(e => e.id === uniquId.toString());
    if (findId.length > 0) throw new Error ("Id repetido")
    const newUser: UserType = {
      id: uniquId.toString(),
      ...user,
      role: user.role === 'admin' || user.role === 'user' ? user.role : 'user',
    };
    users.push(newUser);
    await writeUsers({ users });
    return { message: 'Usuario creado correctamente' };
  } catch (error) {
    throw new Error(`Error al crear usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
  }
};

// Actualizar un usuario
export const updateMockUser = async (id: string, userData: Omit<UserType, 'id'>): Promise<Record<string, string>> => {
  try {
    const { users } = await readUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }
    if (userData.email && userData.email === '') {
      throw new Error('El email no puede estar vacío');
    }
    if (userData.email && users.some((u, i) => u.email === userData.email && i !== userIndex)) {
      throw new Error('El email ya está registrado');
    }
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      id,
      role: userData.role === 'admin' || userData.role === 'user' ? userData.role : "user",
    };
    await writeUsers({ users });
    return { message: 'Usuario modificado correctamente' };
  } catch (error) {
    throw new Error(`Error al actualizar usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
  }
};

// Eliminar un usuario
export const deleteMockUser = async (id: string): Promise<Record<string, string>> => {
  try {
    const { users } = await readUsers();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('Usuario no encontrado');
    }
    users.splice(userIndex, 1);
    await writeUsers({ users });
    return { message: 'Usuario eliminado correctamente' };
  } catch (error) {
    throw new Error(`Error al eliminar usuario: ${error instanceof Error ? error.message : 'Desconocido'}`);
  }
};

// Asegúrate de que haya una línea en blanco al final del archivo
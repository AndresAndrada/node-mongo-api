import { Request, Response, NextFunction } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../../services/userServices';
import { UserType } from '../../modules/Users';

// Decidí tener solo un archivo de controller porque me parecio que son pocas funciones.
export const getAllUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search } = req.query;
    const users: UserType[] = await getAllUsers(typeof search === 'string' ? search : undefined);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'ID es requerido' });
      return;
    }
    const user: UserType | null = await getUserById(id);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado', user });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const postUserControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: Omit<UserType, 'id'> = req.body;
    const newUser = await createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'ID es requerido' });
      return;
    }
    const userData: Omit<UserType, "id" | "_id"> = req.body;
    const newUser = await updateUser(id, userData);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'ID es requerido' });
      return;
    }
    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

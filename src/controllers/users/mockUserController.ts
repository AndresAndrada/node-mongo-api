import { Request, Response, NextFunction } from 'express';
import { createMockUser, deleteMockUser, getAllMockUsers, getMockUserById, updateMockUser } from '../../services/mockUserServices';
import { FileArray, UploadedFile } from 'express-fileupload';
import { cloudinaryPost } from '../../utils/cloudinary';
import { UserType } from '../../types';

export const getAllMockUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search } = req.query;
    const users: UserType[] = await getAllMockUsers(typeof search === 'string' ? search : undefined);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getMockUserByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'ID es requerido' });
      return;
    }
    const user: UserType | null = await getMockUserById(id);
    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const postMockUserControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData: Omit<UserType, 'id'> = req.body;
     console.log("🚀 ~ postUserControllers ~ req.files?.image:", req.files?.image)
      const files = req.files as FileArray | undefined;
      const imageUrl = files?.imageUrl as UploadedFile | undefined;
      let image: string | undefined;
        if (imageUrl) {
        image = await cloudinaryPost(imageUrl.tempFilePath);
        if (!image || typeof image !== 'string') {
          throw new Error('Error al subir la imagen');
        }
      }
    const newUserData: Omit<UserType, 'id'> = {
      ...userData,
      image,
    };
    const newUser = await createMockUser(newUserData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updatMockUserControllers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'ID es requerido' });
      return;
    }
    const userData: Omit<UserType, "id" | "_id"> = req.body;
    const newUser = await updateMockUser(id, userData);
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const deleteMockUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'ID es requerido' });
      return;
    }
    const deletedUser = await deleteMockUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

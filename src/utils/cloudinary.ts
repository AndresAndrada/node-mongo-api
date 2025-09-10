import dotenv from "dotenv";
dotenv.config();

const cloudinary = require('cloudinary').v2;

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
console.log("🚀 ~ CLOUDINARY_CLOUD_NAME:", CLOUDINARY_CLOUD_NAME)

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
});

export const cloudinaryPost = async (image: string) => {
    try {
        const img = await cloudinary.uploader.upload(image, {
            folder: 'ecommerce-cba'
        });
        return img.secure_url;
    } catch (error) {
        throw new Error(`Error al subir imagen a Cloudinary: ${error instanceof Error ? error.message : 'Desconocido'}`)
    };
};

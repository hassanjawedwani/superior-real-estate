import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';
import multer from 'multer'

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'superior',
  },
});

export const upload = multer({ storage: storage });


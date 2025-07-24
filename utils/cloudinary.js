import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name:"dprrmvlow",
  api_key:836476891897989 ,
  api_secret:"4uuptELZqJ27nabW7QrntX6iAsA" ,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'recipes',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

export { cloudinary, storage };

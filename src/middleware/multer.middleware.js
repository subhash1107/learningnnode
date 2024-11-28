import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const currentUrl = import.meta.url
const currentPath = fileURLToPath(currentUrl)




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(currentPath, '../../../public/temp'))
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname)
    }
        
  })
  
  export const upload = multer({ storage: storage })
import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';
import fs from "fs"

const currentUrl = import.meta.url
const currentPath = fileURLToPath(currentUrl)




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const tempPath = path.join(currentPath, '../../../public/temp');
      if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath, { recursive: true });
      }
      cb(null, tempPath); 
    },
    filename: function (req, file, cb) {

      cb(null, file.originalname)
    }
        
  })
  
  export const upload = multer({ storage: storage })
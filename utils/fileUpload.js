// utils/fileUpload.js
import multer from 'multer';
import fs from 'fs';

// Make sure uploads directory exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

export const upload = multer({ dest: 'uploads/' });
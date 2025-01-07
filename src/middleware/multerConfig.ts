import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export const multerConfig = {
    storage: diskStorage({
        destination: './photos',
        filename: (req: any, file, cb) => {
            const uniqName = `${uuidv4()}${extname(file.originalname)}`;
            if (!req['uploadedFiles']) {
                req['uploadedFiles'] = [];
              }
            req['uploadedFiles'].push(uniqName);
            cb(null, uniqName);
        }
    })
};
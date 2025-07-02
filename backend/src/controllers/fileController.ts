import { Request, Response, NextFunction } from 'express';
import { writeFile } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('userId', req.user?.id);

    res
      .status(200)
      .json({ sucess: true, message: 'successfully uploaded file!' });
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
        const userId = req.user?.id;

    const uploadPath = path.join(__dirname, '..', 'db', `uploads`, `${userId}`, `${userId}.conf`);
    writeFile( uploadPath,`
server {
  listen 80;
  server_name jakobmichaelsen.dk;
  root index.html
  location /${userId} { 
    return 301 https://$host$request_uri;  
  }
}`,
      (err) => {
        console.log(err);
      },
    );
  } catch (error) {
    res.status(401).json({ success: false, message: error });
    next(error);
  }
};

export const deleteFile = (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(200)
      .json({ sucess: true, message: 'successfully deleted file!' });
  } catch (error) {
    res.status(401).json({ success: false, message: error });
    next(error);
  }
};

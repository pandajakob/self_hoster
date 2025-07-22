import { Request, Response, NextFunction } from 'express';
import {  existsSync, rmSync, writeFile } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (createConfigFile(req.user?.id)) {
      res
        .status(200)
        .json({ sucess: true, message: 'successfully uploaded file!' });
      return;
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
    next(error);
    return;
  }
};

export const deleteFile = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const {fileName} = req.params

    const filePath = path.join(__dirname, '..', 'db', 'uploads', `${userId}`,`${fileName}`);
    if (!existsSync(filePath)) {
      res.status(404).json("file does not exist")
      return;
    }
    rmSync(filePath, {recursive: true, force:true});
    res
      .status(204)
      .json({ sucess: true, message: 'successfully deleted file!' });

  } catch (error) {
    res.status(400).json({ success: false, message: error });
    next(error);
    return;
  }
};

export const createConfigFile = (userId: string) => {
  const uploadPath = path.join(
    __dirname,
    '..',
    'db',
    `uploads`,
    `${userId}`,
    `${userId}.conf`,
  );
  writeFile(
    uploadPath,
    `server {
  listen 80;
  server_name ${userId}.jakobmichaelsen.dk;
    root /etc/nginx/conf.d/self-hoster/${userId};
}`,
    () => {
      return false;
    },
  );
  return true;
};

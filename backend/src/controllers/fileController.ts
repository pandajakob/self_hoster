import { Request, Response, NextFunction } from 'express';
import {  existsSync, readdirSync, rmSync, writeFile, mkdirSync, statSync } from 'fs';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const userId = req.user?.id;
    const uploadPath = path.join(__dirname, '..', 'db', `uploads`, `${userId}`);
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath,{recursive: true});
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage });

export const getAllFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const folderPath = path.join(__dirname, '..', 'db', `uploads`, `${req.user.id}`) || null; // first id is 1
    const files = readdirSync(folderPath) || null;

    
    if (!folderPath || !files) {
      res.status(404).json({ success: false });
      return;
    }
    
    const AllFileStats: Array<object> = [];

    for (let i = 0; i < files.length; i++) {
      if (files[i].includes('.conf')) continue;
      const fileStats = {
        name: files[i],
        dateCreated: null,
        size: null,
      }

      try {
        const stat = statSync(path.join(folderPath, files[i]));
        fileStats.dateCreated = stat.birthtime;
        fileStats.size = stat.size;
      } catch(err) {
        console.log(err)
        res.status(400).json({ success: false, message: "error reading file stats" });
        return;
      }
      AllFileStats.push(fileStats);
    }
    console.log(AllFileStats)

    res.status(200).json(AllFileStats);
  } catch (error) {
    res.status(400).json({ success: false, message: error });
    next(error);
    return;
  }
};




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

    const filePath = path.join(__dirname, '..', 'db', 'uploads', `${userId}`,`${fileName}`) || null;
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
    `
server {
    listen [::]:443 ssl;
    listen 443 ssl; 

    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
      
    server_name ${userId}.jakobmichaelsen.dk;
    root /etc/nginx/conf.d/self-hoster/${userId};

    ssl_certificate /etc/letsencrypt/live/jakobmichaelsen.dk-0002/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jakobmichaelsen.dk-0002/privkey.pem;
 
}

server {
    listen 80;
    server_name ${userId}.jakobmichaelsen.dk;

    location ^~ /.well-known/acme-challenge/ {
      root /var/www/certbot;
      try_files $uri =404;
    }

}
    
`,
    () => {
      return false;
    },
  );
  return true;
};

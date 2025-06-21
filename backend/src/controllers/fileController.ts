import { Request, Response, NextFunction } from 'express';


export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({sucess: true, message: 'successfully uploaded file!'})
  } catch (error) {
    res.status(401).json({success: false, message: error});
    next(error);
  }
};
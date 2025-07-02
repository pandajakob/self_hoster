
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export const authenticator = (req: Request,res: Response,next: NextFunction) => {
  try {
    if (!req.cookies.token) {
      res.status(401).json('Error getting token');
      res.redirect('/');
      return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(401).json('Error getting secret');
      res.redirect('/');
      return;
    }

    jwt.verify(req.cookies.token, secret, (err: unknown , user: User) => {
      if (err) {
        res.sendStatus(401);
        return;
      }
      req.user = user;
      console.log("successfully authenthicated user:");
      next();
    });
  } catch (error) {
    next(error);
  }
};

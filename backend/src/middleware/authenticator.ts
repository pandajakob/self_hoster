
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export const authenticator = (req: Request, res: Response,next: NextFunction) => {
  try {
        const secret = process.env.JWT_SECRET;

    if (!req.cookies.token || !secret) {
      res.status(400).json('Error getting token');
      res.redirect('/');
      return;
    }

    jwt.verify(req.cookies.token, secret, (err: unknown , user: User) => {
      if (err) {
        res.status(401).json("Error verifying token");
        return;
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

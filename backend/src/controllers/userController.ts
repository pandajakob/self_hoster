import { Request, Response, NextFunction } from 'express';
import db from '../db/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    db.all('SELECT * FROM users;', (err: Error, rows: Array<object>) => {
      if (err) res.send(err);
      else {
        res.status(200).json(rows);
      }
    });
  } catch (error) {
    next(error);
  }
};

// Read all items
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
       res
        .status(401)
        .json({ success: false, message: 'Provide all fields' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      name,
      email,
      hashedPassword,
      (error: Error) => {
        if (error) {
          return res.status(401).json({
            success: false,
            message: 'Could not create user in database',
          });
        } else {
          const secret = process.env.JWT_SECRET;
          if (!secret) {
          throw new Error("Missing JWT_SECRET in environment");
          }

          const token = jwt.sign({ id: email }, secret, {
            expiresIn: '7d',
          });
          res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODe_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
          });
          res.status(201).json({ name, email });
        }
      },
    );
  } catch (error) {
    next(error);
  }
};

// Read single user
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(401).json({ success: false, message: 'Provide all fields' });
    }
    db.get(
      'SELECT * FROM users WHERE id=?',
      id,
      (error: Error, row: Array<object>) => {
        if (error) {
          next(error);
        } else {
          res.status(201).json(row);
        }
      },
    );
  } catch (error) {
    next(error);
  }
};

// Update an user
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
};

// Delete an user
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(404).json('ID not valid');
    }
    db.run('DELETE FROM users WHERE id=?;', id, (error: Error) => {
      if (error) {
        next(error);
      } else {
        res.status(201).json({ message: 'deleted user with id', id });
      }
    });
  } catch (error) {
    next(error);
  }
};

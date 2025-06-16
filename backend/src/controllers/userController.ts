import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import db from '../db/db.js';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    db.all(
      'SELECT * FROM users;',
      (err: Error, rows: Array<object>) => {
        if (err) res.send(err)
        else {
            res.send(rows)
        }
      },
    );
  } catch (error) {
    next(error);
  }
};

// Read all items
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    console.log('name', name);
    console.log('email', email);
    console.log('password', password);
    if (!name || !email || !password) {
      res.send(error);
    }
    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      name,
      email,
      password,
      (err: Error) => {
        if (err) res.status(404).json(err);
      },
    );

    res.status(201).json({name, email})
    // res.json(items);
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
  } catch (error) {}
};

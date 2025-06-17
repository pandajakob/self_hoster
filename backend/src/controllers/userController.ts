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
            res.status(200).json(rows);
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

    if (!name || !email || !password) {
      res.status(404).json("ENTER ALL FIELDS");
    }
    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      name,
      email,
      password,
      (error: Error) => {
        if (error) {
          next(error);
        } else {
          res.status(201).json({name, email });
        };
      },
    );

  } catch (error) {
    next(error);
  }
};

// Read single user
export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json("ENTER ALL FIELDS");
    }
    db.get(
      'SELECT * FROM users WHERE id=?',
      id,
      (error: Error, row: Array<object>) => {
        if (error) {
          next(error);
        } else {
          res.status(201).json(row);
        };
      },
    );
  } catch (error) {
    next(error)
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
      res.status(404).json("ID not valid");
    }
    db.run(
      'DELETE FROM users WHERE id=?;',
      id,
      (error: Error) => {
        if (error) {
          next(error);
        } else {
          res.status(201).json({message: "deleted user with id", id });
        };
      },
    );

  } catch (error) {
    next(error);
  }
};

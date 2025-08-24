import { Request, Response, NextFunction } from 'express';
import db from '../db/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RunResult } from 'sqlite3';

export const getUserOmitPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = req.user.id;
  if (!id) {
    res.status(401).json('unauthorized');
    return;
  }
  try {
    db.get('SELECT * FROM users WHERE id=?', id, (error: Error, row: User) => {
      if (error) {
        next(error);
      } else if (!row.password || !row.email || !row.name || !row.id) {
         res.status(500).json('something went wrong');
        return;
      }
      else {
        row.password = '';
        if (req.user?.id == id) {
          res.status(200).json(row);
          return;
        } else {
          res.status(401).json({ success: false, message: 'unauthorized' });
          return;
        }
      }
    });
  } catch (error) {
    next(error);
  }
};



// Read all items
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: 'Provide all fields' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      name,
      email,
      hashedPassword,
      function (this: RunResult, error: Error) {
        if (error) {
          res.status(503).json({
            success: false,
            message: 'Could not create user in database',
          });
          return;
        }
        const id = this.lastID;
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          res.status(401).json({
            success: false,
            message: 'Missing SECRET in environment',
          });
          return;
        }

        const token = jwt.sign({ id: id }, secret, {
          expiresIn: '7d',
        });

        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODe_ENV === 'production' ? 'none' : 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res
          .status(201)
          .json({ success: true, message: 'Successfully registered user' });
        return;
      },
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Provide all fields' });
      return;
    }
    const user: User = await fetchByEmail(email);
    if (!user) {
      res
        .status(404)
        .json({ success: false, message: 'Email or password is incorrect' });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(404)
        .json({ success: false, message: 'Email or password is incorrect' });
      return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('Missing JWT_SECRET in environment');
    }

    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODe_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: 'successfully signed in user' });
  } catch (err) {
    next(err);
  }
};

const fetchByEmail = async (email: string) => {
  return new Promise<User>((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE email=?',
      email,
      (error: Error, row: User) => {
        if (error) reject(error);
        else resolve(row);
      },
    );
  });
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODe_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, message: 'successfully logged out' });
  } catch (err) {
    next(err);
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
      return
    }
    db.get('SELECT * FROM users WHERE id=?', id, (error: Error, row: User) => {
      if (error) {
        next(error);
      } else {
        row.password = '';
        if (req.user?.id == id) {
          res.status(201).json(row); 
          return
        } else {
          res.status(401).json({ success: false, message: 'unauthorized' });
          return
        }
      }
    });
  } catch (error) {
    next(error);
  }
};



// Delete an user
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.user.id;
    if (!id) {
      res.status(401).json('unauthorized');
      return;
    }
    db.run('DELETE FROM users WHERE id=?;', id, (error: Error) => {
      if (error) {
        next(error);
      } else {
        res.status(204).json({ message: 'deleted user with id', id });
        return;
      }
    });
  } catch (error) {
    next(error);
  }
};

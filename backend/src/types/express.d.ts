// src/types/express.d.ts
import { User } from "../models/user.js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

declare global {
    interface User {
        id: string;
        name: string;
        email: string;
        password: string;
    }
}
declare global {
    interface jwtVerifyError { }
}
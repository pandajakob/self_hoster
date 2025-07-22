import { rmSync} from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import request from 'supertest';
import app from '../dist/app.js'

export const agent = request.agent(app);
export const mockUser = {
        name: "John Doe",
        email: `${Math.random()}@${Math.random()}.${Math.random()}`,
        password: "safepassword123"
    }
export async function cleanUp() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const uploadPath = path.join(__dirname, '..', 'dist', 'db', `uploads`);
    const dbPath = path.join(__dirname, '..', 'dist', 'db', 'users.db');
    rmSync(dbPath, { force: true })
    rmSync(uploadPath, { recursive: true, force: true });
}
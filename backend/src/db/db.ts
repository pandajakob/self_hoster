import path, { dirname } from 'path';
import sqlite3  from 'sqlite3';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dirPath = path.join(__dirname,'users.db');

const db = new sqlite3.Database(dirPath);

function createTable() {
     db.run(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,name text NOT NULL, email text UNIQUE, password text);',
      (err) => {
        if (err) {
          console.log(err);
        }
      },
    );
}
createTable();
export default db;
import sqlite3  from 'sqlite3';
const db = new sqlite3.Database('./src/db/users.db');

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
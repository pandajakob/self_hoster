import sqlite3  from 'sqlite3';
const db = new sqlite3.Database('./src/db/users.db');
/*
function createTable() {
     db.run(
      'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT,name text NOT NULL,email text, password text);',
      (err) => {
        if (err) {
          console.log(err);
        }
      },
    );
}
    */
export default db;
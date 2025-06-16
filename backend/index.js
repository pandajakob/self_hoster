import express from 'express'
const port = 3000;
const app = express();
import path from 'path'
import fs from 'fs'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json());


const dirPath = path.join(__dirname, '..', 'frontend', 'build');
app.use('/', express.static(dirPath))


app.listen(port, ()=>{console.log(`Listening on port ${port}`)})
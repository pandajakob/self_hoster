import request from 'supertest'
import supertest from 'supertest'
import app from '../dist/app.js'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs'
import { cleanUp } from './helpers.js';



describe("/files/upload", () => {
    let agent = request.agent(app);
    const mockUser = {
        name: "John Doe",
        email: `${Math.random()}@${Math.random()}.${Math.random()}`,
        password: "safepassword"
    }

    beforeAll(async () => {
        // This login call will store the Set‑Cookie header internally
        await agent.post("/users/register").send(mockUser).expect(201); // register

    });


    test("Can upload file, create configfile", async () => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const filePath = path.join(__dirname, 'index.html');
        const response = await agent.post("/files/upload").attach("file", filePath);

        expect(response.status).toBe(200)

        const htmlFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, 'index.html'); // first id is 1
        const configFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, '1.conf'); // first id is 1

        expect(existsSync(htmlFilePath)).toBe(true);
        expect(existsSync(configFilePath)).toBe(true);
    })

    test("Can add more files", async () => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const filePath = path.join(__dirname, 'file.test.js');
        const response = await agent.post("/files/upload").attach("file", filePath);

        expect(response.status).toBe(200)

        const htmlFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, 'index.html'); // first id is 1
        const extraFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, 'file.test.js'); // first id is 1
        const configFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, '1.conf'); // first id is 1

        expect(existsSync(htmlFilePath)).toBe(true);
        expect(existsSync(extraFilePath)).toBe(true);
        expect(existsSync(configFilePath)).toBe(true);
    })
    test("Can delete file", async () => {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const filePath = path.join(__dirname, 'file.test.js');
        const response = await agent.delete("/files/delete" + "file.test.js");

        expect(response.status).toBe(204)

        const htmlFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, 'index.html'); // first id is 1
        const extraFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, 'file.test.js'); // first id is 1
        const configFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, '1.conf'); // first id is 1

        expect(existsSync(htmlFilePath)).toBe(true);
        expect(existsSync(extraFilePath)).toBe(false);
        expect(existsSync(configFilePath)).toBe(true);
    })


    

    afterAll(async () => { await cleanUp() });


    // if registered
    // create file
});







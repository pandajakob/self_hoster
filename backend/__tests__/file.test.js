import supertest from 'supertest'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readdirSync } from 'fs'
import { cleanUp, agent, mockUser } from './helpers.js';


describe("file handling tests", () => {
    beforeAll(async () => {
        await agent.post("/users/register").send(mockUser).expect(201); // register

    });
    describe("POST /files/upload", () => {
        test("Can upload file, create configfile", async () => {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);

            const filePath = path.join(__dirname, 'mockFiles', 'index.html');
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

            const filePath = path.join(__dirname, 'mockFiles','script.js');
            const response = await agent.post("/files/upload").attach("file", filePath);

            expect(response.status).toBe(200)

            const htmlFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, 'index.html'); // first id is 1
            const extraFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, 'script.js'); // first id is 1
            const configFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, '1.conf'); // first id is 1

            expect(existsSync(htmlFilePath)).toBe(true);
            expect(existsSync(extraFilePath)).toBe(true);
            expect(existsSync(configFilePath)).toBe(true);
        })


    });
    describe("GET /files/", () => {
        test("returns 200, response JSON, gets all files", async () => {

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const filesPath = path.join(__dirname, '..', 'dist', 'db', `uploads`, '1'); // first id is 1
            const files = readdirSync(filesPath).filter((file) => file !== "1.conf");

            const response = await agent.get("/files/").expect(200);
            
            const body = response.body;

            expect(body.length).toBe(files.length)

            for (let i = 0; i < files.length; i++) {
                expect(body[i]).toHaveProperty('name')
                expect(body[i]).toHaveProperty('size')
                expect(body[i]).toHaveProperty('dateCreated')
                expect(body[i].name).toBe(files[i])
                expect(body[i].size).toBeDefined();
                expect(body[i].dateCreated).toBeDefined();
            }
        })
    })



    describe("DELETE /files/delete", () => {
        describe("Given file does not exists", () => {
            test("return 404", async () => {
                const filename = "nonexistingfile.file"
                await agent.delete("/files/delete" + filename).expect(404);
            })
        })
        describe("Given file exists", () => {
            test("return 204, file not exist", async () => {
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = dirname(__filename);
                const filename = "index.html"
                await agent.delete("/files/delete" + filename).expect(204);

                const htmlFilePath = path.join(__dirname, '..', 'dist', 'db', `uploads`, `1`, 'index.html'); // first id is 1
                expect(existsSync(htmlFilePath)).toBeFalsy();

            })
        })
    })

    afterAll(async () => { await cleanUp() });
})

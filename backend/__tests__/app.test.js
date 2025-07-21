import supertest from 'supertest'
import app from '../dist/app.js'
import db from '../dist/db/db.js'

describe("POST /users/register", () => {
    describe("Given a name, email or password", () => {
   
        test("return code 200", async () => {
            const response = await supertest(app).post("/users/register").send({
                email: "john@doe.com",
                name: "John Doe",
                password: "safepassword"
            })
            expect(response.status).toBe(503); // because of missing db connection

        })

        test("JSON response", async () => {
            const response = await supertest(app).post("/users/register").send({
                email: "john@doe.com",
                name: "John Doe",
                password: "safepassword"
            })
            expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
        })

    })
    describe("when missing name, email or password", () => {
        test("return code 400", async () => {
            const response = await supertest(app).post("/users/register").send({
                email: "",
                name: "",
                password: ""
            })
            expect(response.status).toBe(400);
        })
    })
})



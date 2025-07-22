import supertest from 'supertest'
import app from '../dist/app.js'
import jwt from 'jsonwebtoken'

describe("Authenthication", () => {
    const mockUser = {
        name: "John Doe",
        email: `${Math.random()}@${Math.random()}.${Math.random()}`,
        password: "safepassword123"
    }

    describe("POST /users/register", () => {
        describe("Given a name, email or password", () => {

            test("return code 201, return JSON, sets JWT token", async () => {
                const response = await supertest(app).post("/users/register").send(mockUser)

                // status code
                expect(response.status).toBe(201);

                // JWT token
                expect('set-cookie' in response.header).toBe(true);
                expect(!response.headers['set-cookie'][0].includes('token=;')).toBe(true); //  some token exists
                expect(response.headers['set-cookie'][0].includes('HttpOnly;')).toBe(true);

                // Response JSON
                expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
            })
        })
        describe("when missing name, email or password", () => {
            test("return code 400, no JWT token, returns JSON", async () => {
                const response = await supertest(app).post("/users/register").send({ name: "", email: "", password: "" })

                expect(response.status).toBe(400);

                expect('set-cookie' in response.header).toBe(false);

                expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
            })
        })
    })


    describe("POST /users/login", () => {
        describe("Given a name, email or password", () => {

            describe("user exists", () => {
                test("return 200, JWT token, JSON", async () => {
                    const response = await supertest(app).post("/users/login").send(mockUser)
                    expect(response.status).toBe(200);

                    // JWT token
                    expect('set-cookie' in response.header).toBe(true);
                    expect(!response.headers['set-cookie'][0].includes('token=;')).toBe(true); //  some token exists
                    expect(response.headers['set-cookie'][0].includes('HttpOnly;')).toBe(true);


                    expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
                })
            })

            describe("Incorrect email or password", () => {
                test("return 404, no JWT token, JSON response", async () => {
                    const response = await supertest(app).post("/users/login").send({ email: "wrongemail", password: "badpassword" })
                    expect(response.status).toBe(404);

                    expect('set-cookie' in response.header).toBe(false);

                    expect(response.headers['content-type']).toBe("application/json; charset=utf-8");

                })
            })
        })

        describe("when missing name, email or password", () => {
            test("return code 400, JSON response", async () => {
                const response = await supertest(app).post("/users/login").send({ email: "", name: "", password: "" })
                expect(response.status).toBe(400);
                expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
            })
        })
    })
    describe("POST /users/logout", () => {
        describe("Given a name, email or password", () => {


            test("return 200, no JWT token, JSON", async () => {
                const response = await supertest(app).post("/users/logout").send(mockUser)
                expect(response.status).toBe(200);

                expect(response.headers['set-cookie'][0].includes("token=;")).toBe(true);

                expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
            })
        })

    })
})

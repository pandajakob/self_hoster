import supertest from 'supertest'
import app from '../dist/app.js'
import { cleanUp, agent, mockUser } from './helpers.js'
import jwt from 'jsonwebtoken'

describe("Authenthication", () => {
    describe("POST /users/register", () => {
        describe("Given a name, email or password", () => {

            test("return code 201, return JSON, sets JWT token", async () => {
                const response = await agent.post("/users/register").send(mockUser)

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
                const response = await agent.post("/users/register").send({ name: "", email: "", password: "" })

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
                    const response = await agent.post("/users/login").send(mockUser)
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
                    const response = await agent.post("/users/login").send({ email: "wrongemail", password: "badpassword" })
                    expect(response.status).toBe(404);

                    expect('set-cookie' in response.header).toBe(false);

                    expect(response.headers['content-type']).toBe("application/json; charset=utf-8");

                })
            })
        })

        describe("when missing name, email or password", () => {
            test("return code 400, JSON response", async () => {
                const response = await agent.post("/users/login").send({ email: "", name: "", password: "" })
                expect(response.status).toBe(400);
                expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
            })
        })
    })
    describe("GET /users", () => {
        test("verify JWT payload is ID", async () => {
            const secret = process.env.JWT_SECRET
            const response = await agent.post("/users/login").send(mockUser).expect(200);

            // extract token from headers
            const setCookies = response.header['set-cookie'][0].split(";");
            const token = setCookies[0].split("=")[1]



            jwt.verify(token, secret, (err, user) => {
                expect(user.id).toBe(1);
            });

        })
    })
    describe("GET /users", () => {
        describe("if logged in", () => {
            test("return 200, JWT token, JSON", async () => {
                const response = await agent.get("/users/").expect(200);

                // JSON Response
                expect(response.headers['content-type']).toBe("application/json; charset=utf-8");

            })
        })
        describe("if not logged in", () => {
            test("returns 404, JSON response", async () => {
                await agent.post("/users/logout").send(mockUser);
                
                const response = await agent.get("/users/").expect(400);

                // JSON Response
                expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
            })

        })
    })

    describe("POST /users/logout", () => {
        describe("Given a name, email or password", () => {
            test("return 200, no JWT token, JSON", async () => {
                const response = await agent.post("/users/logout").send(mockUser)
                expect(response.status).toBe(200);

                expect(response.headers['set-cookie'][0].includes("token=;")).toBe(true);

                expect(response.headers['content-type']).toBe("application/json; charset=utf-8");
            })
        })
    })
    afterAll(async () => { await cleanUp() });

})


import supertest from 'supertest'
import app from '../dist/app.js'


describe("POST /users/register", () => {
    describe("Given a name, email or password", () => {
   
        test("return code 401", async () => {
            let ramdomMockEmail = `${Math.random()}@${Math.random()}.${Math.random()}`;
            console.log("randomEmail")
            const response = await supertest(app).post("/users/register").send({
                name: "John Doe",
                email: ramdomMockEmail,
                password: "safepassword1"
            })
            expect(response.status).toBe(401); // because of missing secrets

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




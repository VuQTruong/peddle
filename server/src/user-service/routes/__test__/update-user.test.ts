import request from "supertest";
import { app } from "../../../server";

it("updates user with valid session", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get('/api/auth/current-user')
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const res = await request(app)
    .patch(`/api/users/current-user`)
    .set("Cookie", cookie)
    .send({ 'firstName': 'abcde' })
    .expect(200);

  expect(res.body.data.user.firstName).toBe('abcde');
});

it("fails to updates user with invalid session", async () => {
  const res = await request(app)
    .patch(`/api/users/current-user`)
    .send({ 'firstName': 'abcde' })
    .expect(401);

  expect(res.body.errors[0].message).toBe('Not authorized');
});

it("fails to updates user with invalid data", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get('/api/auth/current-user')
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const invalidPostal = 'N6N6N6';// needs to be 7 digits
  const res = await request(app)
    .patch(`/api/users/current-user`)
    .set("Cookie", cookie)
    .send({ 'postalCode':  invalidPostal })
    .expect(400);

  expect(res.body.errors[0].message).toBe('Invalid value');
})

it("updates valid password", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get('/api/auth/current-user')
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const res = await request(app)
    .patch(`/api/users/current-user`)
    .set("Cookie", cookie)
    .send({ 'password': 'newpassword' })
    .expect(200);
  
   const response = await request(app)
    .post("/api/auth/signin")
    .send({
      email: "test@test.com",
      password: "newpassword",
    })
    .expect(200);
})

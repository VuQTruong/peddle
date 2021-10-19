import request from "supertest";
import { app } from "../../../server";

const randomMongoseId = "507f1f77bcf86cd799439011"; // valid format but doesn't exist in our dbs

it("updates user with valid session", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get('/api/auth/currentuser')
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const res = await request(app)
    .patch(`/api/users/currentuser`)
    .set("Cookie", cookie)
    .send({ 'firstName': 'abcde' })
    .expect(200);

  expect(res.body.data.user.firstName).toBe('abcde');
});

it("fails to updates user with invalid session", async () => {
  const res = await request(app)
    .patch(`/api/users/currentuser`)
    .send({ 'firstName': 'abcde' })
    .expect(401);

  expect(res.body.errors[0].message).toBe('Not authorized');
});

// it("fails to updates user when user doesn't exist", async () => {
//   const cookie = await global.signin();

//   const res = await request(app)
//     .patch(`/api/users/${randomMongoseId}`)
//     .set('Cookie', cookie)
//     .send({ firstName: 'abcde' })
//     .expect(400);

//   expect(res.body.errors[0].message).toBe('User not found');
// });

it("fails to updates user with invalid data", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get('/api/auth/currentuser')
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const invalidPostal = 'N6N6N6';// needs to be 7 digits
  const res = await request(app)
    .patch(`/api/users/currentuser`)
    .set("Cookie", cookie)
    .send({ 'postalCode':  invalidPostal })
    .expect(400);

  expect(res.body.errors[0].message).toBe('Invalid value');
})

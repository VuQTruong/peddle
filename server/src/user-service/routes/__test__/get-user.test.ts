import request from "supertest";
import { app } from "../../../server";
const validMongoseId = '507f1f77bcf86cd799439011'
it("gets a user by id with valid session", async () => {
  const cookie = await global.signin();
  const cookie2 = await global.signin2();

  const user2Res = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie2)
    .send()
    .expect(200);

  // user 1 gets user2's info
  const res = await request(app)
    .get(`/api/users/id/${user2Res.body.data.currentUser.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.id).toBe(user2Res.body.id);
});

it("returns a bad request error when the user id does not exist", async () => {
  const cookie = await global.signin();
  const cookie2 = await global.signin2();

  const user2Res = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie2)
    .send()
    .expect(200);

  // user 1 gets user2's info
  const res = await request(app)
    .get(`/api/users/id/${user2Res.body.data.currentUser.id}`)
    .send()
    .expect(401);

  expect(res.body.errors[0].message).toBe("Not authorized");
});

it("returns bad request error when the user is not found", async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .get(`/api/users/id/${validMongoseId}`)
    .set("Cookie", cookie)
    .send()
    .expect(400);

  expect(res.body.errors[0].message).toBe("User not found");
});

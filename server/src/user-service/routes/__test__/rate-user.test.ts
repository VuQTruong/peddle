import request from "supertest";
import { app } from "../../../server";

it("succesfully rates other user", async () => {
  const cookie = await global.signin();
  const cookie2 = await global.signin2();

  const user2Res = await request(app)
    .get(`/api/auth/current-user`)
    .set("Cookie", cookie2)
    .send()
    .expect(200);

  const res = await request(app)
    .post(`/api/users/${user2Res.body.data.currentUser.id}/rating/5`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  await request(app)
  .get(`/api/auth/current-user`)
  .set("Cookie", cookie2)
  .send()
  .expect(200);
  expect(res.body.data.user.rating).toBe(5);

   await request(app)
  .post(`/api/users/${user2Res.body.data.currentUser.id}/rating/4.5`)
  .set("Cookie", cookie)
  .send()
  .expect(200);

  const res2 = await request(app)
  .post(`/api/users/${user2Res.body.data.currentUser.id}/rating/5`)
  .set("Cookie", cookie)
  .send()
  .expect(200);
  expect(res2.body.data.user.rating).toBe(4.8);
});

it("fails to rate other user due to invalid path variable", async () => {
    const cookie = await global.signin();
    const cookie2 = await global.signin2();
  
    const user2Res = await request(app)
      .get(`/api/auth/current-user`)
      .set("Cookie", cookie2)
      .send()
      .expect(200);

    await request(app)
      .post(`/api/users/${user2Res.body.data.currentUser.id}/rating/5.1`)
      .set("Cookie", cookie)
      .send()
      .expect(400);
  
    await request(app)
      .post(`/api/users/${user2Res.body.data.currentUser.id}/rating/-0.1`)
      .set("Cookie", cookie)
      .send()
      .expect(400);

    await request(app)
    .post(`/api/users/${user2Res.body.data.currentUser.id}/rating/a`)
    .set("Cookie", cookie)
    .send()
    .expect(400);

    await request(app)
    .post(`/api/users/${user2Res.body.data.currentUser.id}/rating/!`)
    .set("Cookie", cookie)
    .send()
    .expect(400);
    
    await request(app)
    .post(`/api/users/${user2Res.body.data.currentUser.id}/rating/0`)
    .set("Cookie", cookie)
    .send()
    .expect(400); 

    await request(app)
    .post(`/api/users/${user2Res.body.data.currentUser.id}/rating/0.9`)
    .set("Cookie", cookie)
    .send()
    .expect(400); 
});

it("fails to rate a user due to invalid session", async () => {
     await request(app)
    .post(`/api/users/asdlkfj/rating/4.5`)
    .send()
    .expect(401);
});

it("fails to rate a user becuase the user does not exist in db", async () => {
    const mongoid = "507f1f77bcf86cd799439011";
    const cookie = await global.signin();

    const res = await request(app)
    .post(`/api/users/${mongoid}/rating/4.5`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
    expect(res.body.message).toBe("User not found");
});

it("fails becuse user is trying to rate themselves", async () => {
    const cookie = await global.signin();
  
    const userRes = await request(app)
      .get(`/api/auth/current-user`)
      .set("Cookie", cookie)
      .send()
      .expect(200);
  
    const res = await request(app)
      .post(`/api/users/${userRes.body.data.currentUser.id}/rating/5`)
      .set("Cookie", cookie)
      .send()
      .expect(400);

    expect(res.body.errors[0].message).toBe("Can't rate user themselves.");
  });
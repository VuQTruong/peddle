import request from "supertest";
import { app } from "../../../server";

const validMongoseId = "507f1f77bcf86cd799439011";

it("gets an empty post item array", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const itemRes = await request(app)
    .get(`/api/users/${userRes.body.data.currentUser.id}/posts`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(itemRes.body.data.items).toBeDefined();
  expect(itemRes.body.data.items.length).toBe(0);
});

it("gets post item array", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  await request(app)
    .post(`/api/items`)
    .set("Cookie", cookie)
    .send({
      name: "Test Item",
      category: "Electronic",
      images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
      price: "13.99",
      description: "Item Description",
    })
    .expect(201);
  await request(app)
    .post(`/api/items`)
    .set("Cookie", cookie)
    .send({
      name: "Test Item",
      category: "Electronic",
      images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
      price: "13.99",
      description: "Item Description",
    })
    .expect(201);

  const itemRes = await request(app)
    .get(`/api/users/${userRes.body.data.currentUser.id}/posts`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(itemRes.body.data.items.length).toBe(2);
});

it("fails due to invalid user id", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const itemRes = await request(app)
    .get(`/api/users/asdf/posts`)
    .set("Cookie", cookie)
    .send()
    .expect(400);

  expect(itemRes.body.errors[0].message).toContain("User id is not valid");
});

it("fails due to user not found", async () => {
  const cookie = await global.signin();
  const itemRes = await request(app)
    .get(`/api/users/${validMongoseId}/posts`)
    .set("Cookie", cookie)
    .send()
    .expect(400);

  expect(itemRes.body.errors[0].message).toContain("User not found");
});

it("fails due to invalid session", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const itemRes = await request(app)
    .get(`/api/users/${userRes.body.data.currentUser.id}/posts`)
    .send()
    .expect(401);
});

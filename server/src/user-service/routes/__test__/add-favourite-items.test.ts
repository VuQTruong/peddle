import request from "supertest";
import { app } from "../../../server";

it("gets fav item  arr for a user", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const itemRes = await request(app)
    .post("/api/items")
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
    .patch(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({ itemId: itemRes.body.data.item.id })
    .expect(200);

  // user 1 gets user2's info
  const res = await request(app)
    .get(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.message).toBe("Success");
  expect(res.body.data.results).toBe(1);
  expect(res.body.data.items.length).toBe(1);
});

it("does not add duplicate items", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const itemRes = await request(app)
    .post("/api/items")
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
    .patch(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({ itemId: itemRes.body.data.item.id })
    .expect(200);

  await request(app)
    .patch(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({ itemId: itemRes.body.data.item.id })
    .expect(200);

  // user 1 gets user2's info
  const res = await request(app)
    .get(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.message).toBe("Success");
  expect(res.body.data.results).toBe(1);
  expect(res.body.data.items.length).toBe(1);
});

it("does not add favourite items with invalid session", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const itemRes = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send({
      name: "Test Item",
      category: "Electronic",
      images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
      price: "13.99",
      description: "Item Description",
    })
    .expect(201);

  const res = await request(app)
    .patch(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .send({ itemId: itemRes.body.data.item.id })
    .expect(401);
  expect(res.body.message).toBe("Not authorized");
});

it("does not add favourite items with invalid request body", async () => {
    const cookie = await global.signin();
  
    const userRes = await request(app)
      .get(`/api/auth/currentuser`)
      .set("Cookie", cookie)
      .send()
      .expect(200);
  
    const itemRes = await request(app)
      .post("/api/items")
      .set("Cookie", cookie)
      .send({
        name: "Test Item",
        category: "Electronic",
        images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
        price: "13.99",
        description: "Item Description",
      })
      .expect(201);
  
    const res = await request(app)
      .patch(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
      .send({ item: itemRes.body.data.item.id })
      .set("Cookie", cookie)
      .expect(400);
    expect(res.body.message).toBe("Invalid request - One or more field is invalid.");
  })
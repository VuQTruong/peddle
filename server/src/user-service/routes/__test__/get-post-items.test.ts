import request from "supertest";
import { app } from "../../../server";


it("gets an empty post item array", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/current-user`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const itemRes = await request(app)
    .get('/api/users/post-items')
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(itemRes.body.data.items).toBeDefined();
  expect(itemRes.body.data.items.length).toBe(0);
});

it("gets post item array", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/current-user`)
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
      postedBy: userRes.body.data.currentUser.id
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
      postedBy: userRes.body.data.currentUser.id
    })
    .expect(201);

  const itemRes = await request(app)
    .get(`/api/users/post-items`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(itemRes.body.data.items.length).toBe(2);
});

it("fails due to invalid session", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/current-user`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const itemRes = await request(app)
    .get(`/api/users/post-items`)
    .send()
    .expect(401);
});

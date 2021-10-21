import request from "supertest";
import { app } from "../../../server";


it("gets empty fav items for a user", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get('/api/auth/current-user')
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const res = await request(app)
    .get('/api/users/favourite-items')
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.message).toBe("Success");
  expect(res.body.data.items.length).toBe(0);
  expect(res.body.data.results).toBe(0);
});

it("gets favourite item array for a user", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/current-user`)
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
      postedBy: userRes.body.data.currentUser.id
    })
    .expect(201);

  await request(app)
    .post(`/api/users/favourite`)
    .set("Cookie", cookie)
    .send({ itemId: itemRes.body.data.item.id })
    .expect(200);

  const res = await request(app)
  .get('/api/users/favourite-items')
  .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.message).toBe("Success");
  expect(res.body.data.results).toBe(1);
  expect(res.body.data.items.length).toBe(1);
});

it("fails to get user fav items due to invalid session", async () => {
  const res = await request(app)
  .get('/api/users/favourite-items')
  .send()
    .expect(401);

  expect(res.body.errors[0].message).toBe("Not authorized");
});
import request from "supertest";
import { app } from "../../../server";

const item = {
  name: "Test Item",
  category: "Electronic",
  images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
  price:  13.99,
  description: "Item Description",
  postedBy: null
};

it("gets an item with valid session", async () => {
  const cookie = await global.signin();

  const currUser = await request(app)
    .get("/api/auth/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  item.postedBy = currUser.body.data.currentUser.id;

  const itemRes = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send(item)
    .expect(201);

  const itemId = itemRes.body.data.item.id;
  const res = await request(app)
    .get(`/api/items/${itemId}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(itemRes.body.data.id).toBe(res.body.data.id);
})

it("does not get an item with invalid session", async () => {
    const cookie = await global.signin();
  
    const itemRes = await request(app)
      .post("/api/items")
      .set("Cookie", cookie)
      .send(item)
      .expect(201);

    const itemId = itemRes.body.data.item.id;
    await request(app).post("/api/auth/signout").send().expect(200);
  
    const res = await request(app)
      .get(`/api/items/${itemId}`)
      .send()
      .expect(401);
    expect(res.body.errors[0].message).toBe('Not authorized')
  })

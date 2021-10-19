import request from "supertest";
import { app } from "../../../server";

it("creates an item with valid session", async () => {
  const cookie = await global.signin();

  const currUser = await request(app)
    .get("/api/auth/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const item = {
    name: "Test Item",
    category: "Electronic",
    images: ["imageUrl_0", "imageUrl_2", "imageUrl_3"],
    price: 12.99,
    description: "Item Description",
    postedBy: currUser.body.data.currentUser.id,
  };
  const itemRes = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send(item)
    .expect(201);
  expect(itemRes.body.data.item).not.toBeNull();
});

it("creates an item even with string type for the price as long as it's numeric", async () => {
  const cookie = await global.signin();
  const currUser = await request(app)
    .get("/api/auth/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const item = {
    name: "Test Item",
    category: "Electronic",
    images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
    price: "13.99",
    description: "Item Description",
    postedBy: currUser.body.data.currentUser.id,
  };

  const res = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send(item)
    .expect(201);

  const price = res.body.data.item.price;
  expect(price).toBe(13.99);
});

it("does not create an item with invalid session", async () => {
  const res = await request(app).post("/api/items").send({}).expect(401);

  expect(res.body.errors[0].message).toBe("Not authorized");
});

it("does not create an item with invalid item", async () => {
  const cookie = await global.signin();
  const res = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send({})
    .expect(400);

  expect(res.body.errors[0].message).toContain("Invalid value");
});

it("does not creates an item with invalid price type", async () => {
  const cookie = await global.signin();
  const currUser = await request(app)
    .get("/api/auth/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  const item = {
    name: "Test Item",
    category: "Electronic",
    images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
    price: "13.99a",
    description: "Item Description",
    postedBy: currUser.body.data.currentUser.id,
  };

  const res = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send(item);
  expect(res.body.errors[0].message).toBe("Price not valid");
});

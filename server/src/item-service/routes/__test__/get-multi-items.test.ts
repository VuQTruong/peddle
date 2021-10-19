import { debug } from "console";
import request from "supertest";
import { app } from "../../../server";

const items = [
  {
    name: "Test Item",
    category: "Electronic",
    images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
    price: 13.99,
    description: "Item Description",
  },
  {
    name: "Test Item2",
    category: "Electronic",
    images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
    price: 15.99,
    description: "Item Description",
  },
];

it("gets items with valid session", async () => {
  const cookie = await global.signin();

  for (const it of items) {
    await request(app)
      .post("/api/items")
      .set("Cookie", cookie)
      .send(it)
      .expect(201);
  }
  const res = await request(app)
    .get("/api/items")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.data.items.length).toBe(2);
});

it("does not get items with invalid session", async () => {
    const cookie = await global.signin();

    for (const it of items) {
      await request(app)
        .post("/api/items")
        .set("Cookie", cookie)
        .send(it)
        .expect(201);
    }
    const res = await request(app)
      .get("/api/items")
      .set("Cookie", cookie)
      .send()
      .expect(200);
  
    expect(res.body.data.items.length).toBe(2);

    const r = await request(app).get("/api/items").send().expect(401);
    expect(r.body.errors[0].message).toBe("Not authorized");
});

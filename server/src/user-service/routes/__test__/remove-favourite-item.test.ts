import request from "supertest";
import { app } from "../../../server";

const item = {
  name: "Test Item",
  category: "Electronic",
  images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
  price: "13.99",
  description: "Item Description",
};
const validMongoseId = "507f1f77bcf86cd799439011";

it("removes a favourite item from favourite item array", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const itemRes = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send(item)
    .expect(201);

  const itemRes2 = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send(item)
    .expect(201);

  const addFavRes = await request(app)
    .post(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({itemId: itemRes.body.data.item.id})
    .expect(200);
  
    const addFavRes2 = await request(app)
    .post(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({itemId: itemRes2.body.data.item.id})
    .expect(200);

  const res = await request(app)
    .get(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.data.results).toBe(2);
  expect(res.body.data.items.length).toBe(2);

  await request(app)
    .delete(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({ itemId: itemRes.body.data.item.id })
    .expect(200);

  const res1 = await request(app)
    .get(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res1.body.data.results).toBe(1);
  expect(res1.body.data.items.length).toBe(1);
  expect(res1.body.data.items[0].id).toBe(itemRes2.body.data.item.id);
});

it("fails to remove an item because the item does not exist", async () => {
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

    const addFavRes = await request(app)
    .post(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({itemId: itemRes.body.data.item.id})
    .expect(200);

  await request(app)
    .delete(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({ itemId: itemRes.body.data.item.id })
    .expect(200);

  const res = await request(app)
    .delete(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({ itemId: itemRes.body.data.item.id })
    .expect(400);

  expect(res.body.message).toContain("Item does not exist in favourite items");
});

it("fails to delete favourite items with invalid session", async () => {
  const res = await request(app)
    .delete(`/api/users/${validMongoseId}/favourite`)
    .send({ itemId: validMongoseId })
    .expect(401);
  expect(res.body.message).toBe("Not authorized");
});

it("does not remove favourite items because item id is in invalid format", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const addFavRes = await request(app)
    .post(`/api/users/${userRes.body.data.currentUser.id}/favourite`)
    .set("Cookie", cookie)
    .send({itemId: 'abc'})
    .expect(400);

  expect(addFavRes.body.message).toBe('Item id is not valid');
})

it("does not remove favourite items because user id is in invalid format", async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

    const itemRes = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send(item)
    .expect(201);

  const addFavRes = await request(app)
    .post(`/api/users/invaliduserid/favourite`)
    .set("Cookie", cookie)
    .send({itemId: itemRes.body.data.item.id})
    .expect(400);

  expect(addFavRes.body.message).toBe('User id is not valid');
})

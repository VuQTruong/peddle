import request from "supertest";
import { app } from "../../../server";

interface ItemResponse extends request.Response{
  data?: any;
}


it("deletes an item and responds with a common success object", async () => {
  const cookie = await global.signin();
  const userRes = await request(app)
  .get("/api/auth/currentuser")
  .set('Cookie', cookie)
  .send();
  const item = {
      name: "Test Item",
      category: "Electronic",
      images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
      price: 13.99,
      description: "Item Description",
      postedBy: userRes.body.data.currentUser.id
  };
  const itemRes = await request(app)
    .post("/api/items")
    .set("Cookie", cookie)
    .send(item)
    .expect(201);
  // create items
  const itemId  = itemRes.body.data.item.id;

  //dete item
  const response = await request(app)
    .delete(`/api/items/${itemId}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);
    expect(response.body.message).toContain("Success");
});

it("fails to delete an item because the item id is invalid mongodb id", async () => {
  const cookie = await global.signin();
  const res = await request(app)
  .get("/api/auth/currentuser")
  .set('Cookie', cookie)
  .send();

  const response = await request(app)
    .delete('/api/items/abc')
    .set("Cookie", cookie)
    .send()
    .expect(400);
    expect(response.body.errors[0].message).toBe("itemId not in Mongo Id form");
});

it("fails to delete an item because the item user tries to delete doesn't belong them", async () => {
  const user1Cookie = await global.signin();
  const user2Cookie = await global.signin2();
  const user1 = await request(app)
  .get("/api/auth/currentuser")
  .set('Cookie', user1Cookie)
  .send()
  .expect(200);

  const user2 = await request(app)
  .get("/api/auth/currentuser")
  .set('Cookie', user2Cookie)
  .send()
  .expect(200);

  const item = {
      name: "Test Item",
      category: "Electronic",
      images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
      price: 13.99,
      description: "Item Description",
      postedBy: user1.body.data.currentUser.id
  };
  // user1 post an item
  const itemRes: ItemResponse = await request(app)
  .post("/api/items")
  .set('Cookie', user1Cookie)
  .send(item)
  .expect(201);
  const itemPosted  = itemRes.body.data.item;

  // user 2 delete the item user1 just posted
  const response = await request(app)
    .delete(`/api/items/${itemPosted.id}`)
    .set("Cookie", user2Cookie)
    .send()
    .expect(403);

    expect(response.body.errors[0].message).toContain("You are not allowed to delete this item");
});

it("fails to delete an item because the item doesn't exist", async () => {
  const cookie = await global.signin();
  const userRes = await request(app)
  .get("/api/auth/currentuser")
  .set('Cookie', cookie)
  .send();
  const item = {
      name: "Test Item",
      category: "Electronic",
      images: ["imageUrl_1", "imageUrl_2", "imageUrl_3"],
      price: 13.99,
      description: "Item Description",
      postedBy: userRes.body.data.currentUser.id
  };
  const itemRes: ItemResponse = await request(app)
  .post("/api/items")
  .set('Cookie', cookie)
  .send(item)
  .expect(201);

  const itemPosted = itemRes.body.data.item;

  await request(app)
    .delete(`/api/items/${itemPosted.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  const response = await request(app)
    .delete(`/api/items/${itemPosted.id}`)
    .set("Cookie", cookie)
    .send()
    .expect(400);

    expect(response.body.errors[0].message).toContain("Item not found");
})



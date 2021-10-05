import request from "supertest";
import { app } from "../../../server";

it("responds with detailas about the current user", async () => {
  const cookie = await global.signin();
  
  const response = await request(app)
    .get("/api/auth/currentuser")
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () =>{
  const response = await request(app)
    .get("/api/auth/currentuser")
    .send()
    .expect(200);
  
    expect(response.body.currentUser).toBeNull()
})

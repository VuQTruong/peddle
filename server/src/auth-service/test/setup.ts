import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../../server";
import request from "supertest";

declare global {
  var signin: () => Promise<string[]>;
  var signin2: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      firstName: "John",
      lastName: "Doe",
      photo: "base64 or other format",
      email: "test@test.com",
      password: "password",
      lat: 123,
      lng: 456,
      postalCode: "N6H 1A2",
      isPremiumMember: false,
      dislikedItemIds: [],
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie;
};
global.signin2 = async () => {
  const response = await request(app)
    .post("/api/auth/signup")
    .send({
      firstName: "Tae Kwon",
      lastName: "Doe",
      photo: "base64 or other format",
      email: "test2@test.com",
      password: "password",
      lat: 123,
      lng: 456,
      postalCode: "N6H 1A2",
      isPremiumMember: false,
      dislikedItemIds: [],
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");
  return cookie;
};

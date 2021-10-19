import request from 'supertest';
import { app } from '../../../server';

const userTestData = {
  firstName: 'Tae Kwon',
  lastName: 'Doe',
  photo: 'base64 or other format',
  email: 'test@test.com',
  password: 'password',
  lat: 123,
  lng: 456,
  postalCode: 'N6H 1A2',
  isPremiumMember: false,
  dislikedItemIds: [],
};

it('returns a 201 on successful signup', async () => {
  await request(app).post('/api/auth/signup').send(userTestData).expect(201);
});

it('returns a 400 with an invalid passowrd', async () => {
  const response = await request(app)
    .post('/api/auth/signup')
    .send({
      firstName: 'string',
      lastName: 'string',
      photo: 'string',
      email: 'test@test.com',
      password: 'a',
      lat: 123,
      lng: '456',
      postalCode: 'string',
      isPremiumMember: false,
      dislikedItemIds: [],
    })
    .expect(400);
  expect(response.body.errors[0].message).toBe(
    'Password must be between 4 and 20 characters'
  );
});
it('returns a 400 with an invalid email', async () => {
  const response = await request(app)
    .post('/api/auth/signup')
    .send({
      firstName: 'string',
      lastName: 'string',
      photo: 'string',
      email: 'test@',
      password: 'password',
      lat: 123,
      lng: '456',
      postalCode: 'string',
      isPremiumMember: false,
      dislikedItemIds: [],
    })
    .expect(400);
  expect(response.body.errors[0].message).toBe(
    'Email must be valid'
  );
});

it('returns a 400 with missing required attriture', async () => {
  const response = await request(app)
    .post('/api/auth/signup')
    .send({
      firstName: 'string',
      lastName: 'string',
      photo: 'string',
      email: 'test@test.com',
      lat: 123,
      lng: 456,
      postalCode: 'string',
      isPremiumMember: false,
      dislikedItemIds: [],
    })
    .expect(400);
  expect(response.body.errors[0].message).toBe(
    'Password must be between 4 and 20 characters'
  );

});

it('returns a 400 with incorrect data type in request body', async () => {
  const response = await request(app)
    .post('/api/auth/signup')
    .send({
      firstName: 'string',
      lastName: 'string',
      photo: 'string',
      email: 'test@test.com',
      lat: '123', //  should be a number
      lng: 456,
      postalCode: 'string',
      isPremiumMember: false,
      dislikedItemIds: [],
    })
    .expect(400);
  expect(response.body.errors[0].message).toBe(
    'Password must be between 4 and 20 characters'
  );
});

it('disallows duplicate emails', async () => {
  const cookie = await global.signin();

  await request(app).post('/api/auth/signup').send(userTestData).expect(400);
});

it('sets a cookie after successful signup', async () => {
  const cookie = await global.signin();
  expect(cookie).toBeDefined();
});

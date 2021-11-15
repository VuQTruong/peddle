import request from 'supertest';
import { app } from '../../../server';

it('updates an item with valid session', async () => {
  const cookie = await global.signin();
  const userRes = await request(app)
    .get(`/api/auth/current-user`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  const item = {
    name: 'Test Item',
    category: 'Electronic',
    images: ['imageUrl_0', 'imageUrl_2', 'imageUrl_3'],
    price: 12.99,
    description: 'Item Description',
    postedBy: userRes.body.data.currentUser.id,
  };

  const itemRes = await request(app)
    .post('/api/items')
    .set('Cookie', cookie)
    .send(item)
    .expect(201);

  const itemId = itemRes.body.data.item.id;
  expect(itemRes.body.data.item.isSold).toBe(false);

  const patchRes = await request(app)
    .patch(`/api/items/${itemId}`)
    .set('Cookie', cookie)
    .send({ isSold: true })
    .expect(200);

  expect(patchRes.body.data.item.isSold).toBe(true);
  expect(patchRes.body.message).toBe('Item updated successfully');

  const res = await request(app)
    .get(`/api/items/${itemId}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.data.item.isSold).toBe(true);
});

it('does not update an item with valid session', async () => {
  const cookie = await global.signin();
  const userRes = await request(app)
    .get(`/api/auth/current-user`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  const item = {
    name: 'Test Item',
    category: 'Electronic',
    images: ['imageUrl_0', 'imageUrl_2', 'imageUrl_3'],
    price: 12.99,
    description: 'Item Description',
    postedBy: userRes.body.data.currentUser.id,
  };
  const itemRes = await request(app)
    .post('/api/items')
    .set('Cookie', cookie)
    .send(item)
    .expect(201);
  const itemId = itemRes.body.data.item.id;
  expect(itemRes.body.data.item.isSold).toBe(false);

  const patchRes = await request(app)
    .patch(`/api/items/${itemId}`)
    .send({ isSold: true })
    .expect(401);

  expect(patchRes.body.errors[0].message).toBe('Not authorized');
});

it('does not update an item with invalid attributes', async () => {
  const cookie = await global.signin();
  const userRes = await request(app)
    .get(`/api/auth/current-user`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  const item = {
    name: 'Test Item',
    category: 'Electronic',
    images: ['imageUrl_0', 'imageUrl_2', 'imageUrl_3'],
    price: 12.99,
    description: 'Item Description',
    postedBy: userRes.body.data.currentUser.id,
  };
  const itemRes = await request(app)
    .post('/api/items')
    .set('Cookie', cookie)
    .send(item)
    .expect(201);
  const itemId = itemRes.body.data.item.id;
  expect(itemRes.body.data.item.isSold).toBe(false);

  const patchRes = await request(app)
    .patch(`/api/items/${itemId}`)
    .set('Cookie', cookie)
    .send({ images: '12345' })
    .set('Cookie', cookie)
    .expect(400);

  expect(patchRes.body.errors[0].message).toBe('Invalid value');
});

it("does not update an item with when item doesn't belong a user", async () => {
  const cookie = await global.signin();
  const cookie2 = await global.signin2();
  const userRes = await request(app)
    .get(`/api/auth/current-user`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  const item = {
    name: 'Test Item',
    category: 'Electronic',
    images: ['imageUrl_0', 'imageUrl_2', 'imageUrl_3'],
    price: 12.99,
    description: 'Item Description',
    postedBy: userRes.body.data.currentUser.id,
  };
  const itemRes = await request(app)
    .post('/api/items')
    .set('Cookie', cookie)
    .send(item)
    .expect(201);

  const itemId = itemRes.body.data.item.id;

  const patchRes = await request(app)
    .patch(`/api/items/${itemId}`)
    .set('Cookie', cookie2)
    .send({ isSold: true })
    .expect(401);

  expect(patchRes.body.errors[0].message).toBe('Not authorized');
});

it("fails when item doesn't exist", async () => {
  const cookie = await global.signin();
  const userRes = await request(app)
    .get(`/api/auth/current-user`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  const item = {
    name: 'Test Item',
    category: 'Electronic',
    images: ['imageUrl_0', 'imageUrl_2', 'imageUrl_3'],
    price: 12.99,
    description: 'Item Description',
    postedBy: userRes.body.data.currentUser.id,
  };
  const itemRes = await request(app)
    .post('/api/items')
    .set('Cookie', cookie)
    .send(item)
    .expect(201);

  const itemId = itemRes.body.data.item.id;

  await request(app)
    .delete(`/api/items/${itemId}`)
    .set('Cookie', cookie)
    .send(item)
    .expect(200);

  const patchRes = await request(app)
    .patch(`/api/items/${itemId}`)
    .set('Cookie', cookie)
    .send({ isSold: true })
    .expect(400);

  expect(patchRes.body.errors[0].message).toBe(
    'Bad request - item doesn not exist'
  );
});

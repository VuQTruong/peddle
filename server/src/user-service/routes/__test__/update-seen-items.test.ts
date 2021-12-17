import request from 'supertest';
import { app } from '../../../server';

it('updates seen item ' , async () => {
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
    images: ['imageUrl_1', 'imageUrl_2', 'imageUrl_3'],
    price: '13.99',
    description: 'Item Description',
    postedBy: userRes.body.data.currentUser.id,
  };

  const itemRes1 = await request(app)
    .post(`/api/items`)
    .set('Cookie', cookie)
    .send(item)
    .expect(201);

  const itemRes2 = await request(app)
    .post(`/api/items`)
    .set('Cookie', cookie)
    .send(item)
    .expect(201);

  await request(app)
    .patch('/api/users/seen-items')
    .set('Cookie', cookie2)
    .send({itemId: itemRes1.body.data.item.id})
    .expect(200);

  const res = await request(app)
    .get('/api/users/seen-items')
    .set('Cookie', cookie2)
    .send()
    .expect(200);

  expect(res.body.data.items.length).toBe(1);
});

it('does not updates seen item because the item does not exist' , async () => {
  const cookie = await global.signin();

  await request(app)
    .patch('/api/users/seen-items')
    .set('Cookie', cookie)
    .send({itemId: "507f1f77bcf86cd799439011"})
    .expect(200);

  const res = await request(app)
    .get('/api/users/seen-items')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.data.items.length).toBe(0);
});

it('does not update seen item because the request body is invalid' , async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .patch('/api/users/seen-items')
    .set('Cookie', cookie)
    .send({itemId: "asdf"})
    .expect(400);

  expect(res.body.errors[0].message).toBe('Invalid item Id(s)');
});

it('does not update seen item due to invalid session' , async () => {

  const res = await request(app)
    .patch('/api/users/seen-items')
    .send({itemId: "asdf"})
    .expect(401);

  expect(res.body.errors[0].message).toBe('Not authorized');
});

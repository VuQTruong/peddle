import request from 'supertest';
import { app } from '../../../server';

it('gets seen item', async () => {
  const cookie = await global.signin();
  const cookie2 = await global.signin2();

  const userRes = await request(app)
    .get(`/api/auth/currentuser`)
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
    .patch('/api/users/seen')
    .set('Cookie', cookie2)
    .send({itemId: [ itemRes1.body.data.item.id, itemRes2.body.data.item.id ]})
    .expect(200);

  const res = await request(app)
    .get('/api/users/seen')
    .set('Cookie', cookie2)
    .send()
    .expect(200);

  expect(res.body.data.items.length).toBe(2);
});

it('gets an empty seen item array', async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .get('/api/users/seen')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.data.items).toBeDefined();
  expect(res.body.data.items.length).toBe(0);
});

it('fails to get seen items due to invalid session', async () => {
  const res = await request(app)
    .get('/api/users/seen')
    .send()
    .expect(401);

  expect(res.body.errors[0].message).toBe('Not authorized');
});

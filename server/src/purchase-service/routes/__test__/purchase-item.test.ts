import request from 'supertest';
import { app } from '../../../server';

it('purchase an item with valid session', async () => {
  const seller = await global.signin();
  const buyer = await global.signin2();

  const sellerSession = await request(app)
    .get(`/api/auth/current-user`)
    .set('Cookie', seller)
    .send()
    .expect(200);

  const item = {
    name: 'Test Item',
    category: 'Electronic',
    images: ['imageUrl_0', 'imageUrl_2', 'imageUrl_3'],
    price: 12.99,
    description: 'Item Description',
    postedBy: sellerSession.body.data.currentUser.id,
  };

  const postRes = await request(app)
    .post('/api/items')
    .set('Cookie', seller)
    .send(item)
    .expect(201);

  const purchaseRes = await request(app)
    .post(`/api/purchase/${postRes.body.data.item.id}`)
    .set('Cookie', buyer)
    .send({})
    .expect(200);
  expect(purchaseRes.body.message).toBe('Order placed');
});

it('does not make a purchase due to invalid session', async () => {
  const res = await request(app)
    .post(`/api/purchase/someitemid`)
    .send({})
    .expect(401);
  expect(res.body.errors[0].message).toBe('Not authorized');
});

it('does not make a purchase becuase itemId is not valid mongo id', async () => {
  const seller = await global.signin();
  const res = await request(app)
    .post(`/api/purchase/notvalidmongoid`)
    .set('Cookie', seller)
    .send({})
    .expect(400);
  expect(res.body.errors[0].message).toBe('Item id not in valid MongoId form');
});

it('does not make a purchase becuase item is already sold', async () => {
  const seller = await global.signin();
  const buyer = await global.signin2();

  const sellerSession = await request(app)
    .get(`/api/auth/current-user`)
    .set('Cookie', seller)
    .send()
    .expect(200);

  const item = {
    name: 'Test Item',
    category: 'Electronic',
    images: ['imageUrl_0', 'imageUrl_2', 'imageUrl_3'],
    price: 12.99,
    description: 'Item Description',
    postedBy: sellerSession.body.data.currentUser.id,
  };

  const postRes = await request(app)
    .post('/api/items')
    .set('Cookie', seller)
    .send(item)
    .expect(201);

   await request(app)
    .post(`/api/purchase/${postRes.body.data.item.id}`)
    .set('Cookie', buyer)
    .send({})
    .expect(200);

    const res = await request(app)
    .post(`/api/purchase/${postRes.body.data.item.id}`)
    .set('Cookie', buyer)
    .send({})
    .expect(400);
    expect(res.body.errors[0].message).toBe('Item is already sold.');
});

it('does not make a purchase becuase user is trying to buying from themselves', async () => {
    const seller = await global.signin();
  
    const sellerSession = await request(app)
      .get(`/api/auth/current-user`)
      .set('Cookie', seller)
      .send()
      .expect(200);
  
    const item = {
      name: 'Test Item',
      category: 'Electronic',
      images: ['imageUrl_0', 'imageUrl_2', 'imageUrl_3'],
      price: 12.99,
      description: 'Item Description',
      postedBy: sellerSession.body.data.currentUser.id,
    };
  
    const postRes = await request(app)
      .post('/api/items')
      .set('Cookie', seller)
      .send(item)
      .expect(201);
  
    const res = await request(app)
      .post(`/api/purchase/${postRes.body.data.item.id}`)
      .set('Cookie', seller)
      .send({})
      .expect(400);
      expect(res.body.errors[0].message).toBe('Cannot purchase item from users themselves');
  });

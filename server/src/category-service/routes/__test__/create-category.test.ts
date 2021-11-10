import request from 'supertest';
import { app } from '../../../server';

it('creates a category', async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .post('/api/categories')
    .set('Cookie', cookie)
    .send({ name: 'toys ' })
    .expect(201);
  const cat = await request(app)
    .get('/api/categories')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(cat.body.data.results).toBe(1);
  expect(cat.body.data.categories.length).toBe(1);
  expect(res.body.data.category.name).toBe('Toys');
});

it('does not a category with invalid request body', async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .post('/api/categories')
    .set('Cookie', cookie)
    .send({ name: '' })
    .expect(400);
  expect(res.body.errors[0].message).toBe(
    'Invalid category name - must be in length of 2 to 20 characters'
  );
});

it('does not a category with invalid session', async () => {
  const res = await request(app)
    .post('/api/categories')
    .send({ name: 'Stuff' })
    .expect(401);
  expect(res.body.errors[0].message).toBe('Not authorized');
});

it('does not a category becuase category name is too long/ short', async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .post('/api/categories')
    .send({ name: 'a' })
    .set('Cookie', cookie)
    .expect(400);
  const res1 = await request(app)
    .post('/api/categories')
    .send({
      name: 'askdfjasl;fjkasl;fjkasldkfjsdkfjasldkfjasldk;fjaslk;dfjaskldfjasdklfjas',
    })
    .set('Cookie', cookie)
    .expect(400);
  expect(res.body.errors[0].message).toBe(
    'Invalid category name - must be in length of 2 to 20 characters'
  );
  expect(res1.body.errors[0].message).toBe(
    'Invalid category name - must be in length of 2 to 20 characters'
  );
});

it('does not create duplicate category', async () => {
  const cookie = await global.signin();

  for (const i of [1, 0, 0, 0, 0]) {
    await request(app)
      .post('/api/categories')
      .set('Cookie', cookie)
      .send({ name: 'Toys    ' })
      .expect(200 + i);

    await request(app)
      .post('/api/categories')
      .set('Cookie', cookie)
      .send({ name: 'toys ' })
      .expect(200);
    await request(app)
      .post('/api/categories')
      .set('Cookie', cookie)
      .send({ name: ' toys' })
      .expect(200);
      await request(app)
      .post('/api/categories')
      .set('Cookie', cookie)
      .send({ name: ' toys' })
      .expect(200);
  }

  const cat = await request(app)
    .get('/api/categories')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(cat.body.data.results).toBe(1);
  expect(cat.body.data.categories.length).toBe(1);
  expect(cat.body.data.categories[0].name).toBe('Toys');
});

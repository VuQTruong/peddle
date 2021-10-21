import request from 'supertest';
import { app } from '../../../server';

it('gets categories', async () => {
  const cookie = await global.signin();

  const categories = ['toys', 'auto', 'Tools', 'Laptops'];
  const responses = [];
  for (const i of [0,1,2,3]) {
    const res = await request(app)
      .post('/api/categories')
      .set('Cookie', cookie)
      .send({ name: ' ' + categories[i] + ' ' })
      .expect(201);
    expect(res.body.data.category.name).toBe(categories[i].toLowerCase().charAt(0).toUpperCase() + categories[i].slice(1));
    responses.push(res);
  }

  const cat = await request(app)
    .get('/api/categories')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(cat.body.data.results).toBe(categories.length);
  expect(cat.body.data.categories.length).toBe(categories.length);
  for (const i of [0,1,2,3]) {
    expect(cat.body.data.categories[i].name).toBe(categories[i].toLowerCase().charAt(0).toUpperCase() + categories[i].slice(1));
  }
});

it('does not get category with invalid session', async () => {
  const res = await request(app).get('/api/categories').send().expect(401);

  expect(res.body.errors[0].message).toBe('Not authorized');
});

it('gets categories', async () => {
  const cookie = await global.signin();

  const cat = await request(app)
    .get('/api/categories')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(cat.body.data.results).toBe(0);
  expect(cat.body.data.categories.length).toBe(0);
});

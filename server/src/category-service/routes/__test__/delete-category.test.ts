import request from 'supertest';
import { app } from '../../../server';

it('deletes a category', async () => {
  const cookie = await global.signin();

  const catRes = await request(app)
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

  const res = await request(app)
    .delete(`/api/categories/${catRes.body.data.category.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.message).toBe('Category deleted successfully');

  const cat1 = await request(app)
    .get('/api/categories')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(cat1.body.data.results).toBe(0);
  expect(cat1.body.data.categories.length).toBe(0);
});

it('thorws a bad request when trying to delete a non-exist id', async () => {
  const cookie = await global.signin();

  const catRes = await request(app)
    .post('/api/categories')
    .set('Cookie', cookie)
    .send({ name: 'toys ' })
    .expect(201);

  const res = await request(app)
    .delete('/api/categories/507f1f77bcf86cd799439011')
    .set('Cookie', cookie)
    .send()
    .expect(400);

  expect(res.body.message).toBe('Category does not exist');
});

it('thorws a bad request with invalid category id', async () => {
  const cookie = await global.signin();

  const catRes = await request(app)
    .post('/api/categories')
    .set('Cookie', cookie)
    .send({ name: 'toys ' })
    .expect(201);

  const res = await request(app)
    .delete('/api/categories/507f1f77bcf86cd7999011')
    .set('Cookie', cookie)
    .send()
    .expect(400);

  expect(res.body.errors[0].message).toBe('Invalid category Id');
});

it('does not delete a category with invalid session', async () => {
  const res = await request(app)
    .delete('/api/categories/507f1f77bcf86cd799439011')
    .send()
    .expect(401);

  expect(res.body.errors[0].message).toBe('Not authorized');
});

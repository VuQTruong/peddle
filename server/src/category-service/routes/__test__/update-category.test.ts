import request from 'supertest';
import { app } from '../../../server';

it('updates a category', async () => {
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

it('does not update a category because the category does not exist', async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .patch('/api/categories/507f1f77bcf86cd799439011')
    .set('Cookie', cookie)
    .send({ name: 'Toy' })
    .expect(400);
  expect(res.body.errors[0].message).toBe('Category does not exist');

});

it('does not update a category with invalid session', async () => {
  const res = await request(app)
    .patch('/api/categories/507f1f77bcf86cd799439011')
    .send({ name: 'Stuff' })
    .expect(401);
  expect(res.body.errors[0].message).toBe('Not authorized');
});

it('does not update a category because the category id is invalid', async () => {
  const cookie = await global.signin();
  const res = await request(app)
    .patch('/api/categories/507f')
    .set('Cookie', cookie)
    .send({ name: 'Toy' })
    .expect(400);
  expect(res.body.errors[0].message).toBe('Invalid category id');
});

it('does not update a category becuase category name is too long/ short', async () => {
  const cookie = await global.signin();

  const userRes = await request(app)
    .get('/api/auth/current-user')
    .send()
    .set('Cookie', cookie)
    .expect(200);

  const res1 = await request(app)
    .patch(`/api/categories/${userRes.body.data.currentUser.id}`)
    .send({
      name: 'askdfjasl;fjkasl;fjkasldkfjsdkfjasldkfjasldk;fjaslk;dfjaskldfjasdklfjas',
    })
    .set('Cookie', cookie)
    .expect(400);
    const res2 = await request(app)
    .patch(`/api/categories/${userRes.body.data.currentUser.id}`)
    .send({
      name: 'a  ',
    })
    .set('Cookie', cookie)
    .expect(400);
  expect(res1.body.errors[0].message).toBe(
    'Invalid category name - must be in length of 2 to 20 characters'
  );
  expect(res2.body.errors[0].message).toBe(
    'Invalid category name - must be in length of 2 to 20 characters'
  );
});

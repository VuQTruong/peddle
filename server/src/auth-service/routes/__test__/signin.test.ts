import request from 'supertest';
import { app } from '../../../server';

it('fails when a email that does not exist is supplied', async () => {
  const response = await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
  expect(response.body.errors[0].message).toBe('Invalid credentials');
});

it('fails when an incorrect password is supplied', async () => {
  const cookie = await global.signin();

  const res= await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'password baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad',
    })
    .expect(400);
  expect(res.body.errors[0].message).toBe('Invalid credentials');
});

it('fails when either email or password is not supplied', async () => {
  await global.signin();

  let res = await request(app)
    .post('/api/auth/signin')
    .send({
      email: 'test@test.com',
    })
    .expect(400);
  expect(res.body.errors[0].message).toBe(
    'Password not supplied'
  );

  res = await request(app)
    .post('/api/auth/signin')
    .send({
      password: 'password',
    })
    .expect(400);
  expect(res.body.errors[0].message).toBe(
    'Email must be valid'
  );

  res = await request(app).post('/api/auth/signin').send({}).expect(400);

  expect(res.body.errors[0].message).toBe(
    'Email must be valid'
  );
});

it('responsed with a cookie when given valid credentials', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .post('/api/auth/signin')
    .set('Cookie', cookie)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

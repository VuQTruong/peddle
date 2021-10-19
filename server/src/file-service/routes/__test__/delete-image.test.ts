import request from 'supertest';
import { app } from '../../../server';

it('rejects if field name is other than: imageUrl', async () => {
  const cookie = await global.signin();

  const imgRes = await request(app)
    .delete('/api/images')
    .set('Cookie', cookie)
    .send({
      someName:
        'https://res.cloudinary.com/dz4cswhcz/image/upload/v1634560326/njedtri61bg8lrc3kf5y.jpg',
    })
    .expect(400);

  expect(imgRes.body.message).toContain('Invalid request');
});

it('rejects if the imageUrl is a number', async () => {
  const cookie = await global.signin();

  const imgRes = await request(app)
    .delete('/api/images')
    .set('Cookie', cookie)
    .send({
      imageUrl: 2,
    })
    .expect(400);

  expect(imgRes.body.message).toContain('Invalid request');
});

it('rejects if the imageUrl is an empty string', async () => {
  const cookie = await global.signin();

  const imgRes = await request(app)
    .delete('/api/images')
    .set('Cookie', cookie)
    .send({
      imageUrl: '',
    })
    .expect(400);

  expect(imgRes.body.message).toContain('No Image Selected!');
});

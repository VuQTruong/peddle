import request from 'supertest';
import { app } from '../../../server';

it('successfully uploads images to cloudinary', async () => {
  const cookie = await global.signin();

  const imgRes = await request(app)
    .post('/api/images')
    .set('Cookie', cookie)
    .attach('file', `${__dirname}/test-files/4.jpg`)
    .attach('file', `${__dirname}/test-files/5.jpg`)
    .expect(200);

  expect(imgRes.body.data.images).not.toBeNull();
});

it('rejects file with extentions other than jpeg or png', async () => {
  const cookie = await global.signin();

  const imgRes = await request(app)
    .post('/api/images')
    .set('Cookie', cookie)
    .attach('file', `${__dirname}/test-files/test.txt`)
    .expect(400);

  expect(imgRes.body.message).toContain('File extension is not supported!');
});

it('rejects to upload if the form-data key is different than: file', async () => {
  const cookie = await global.signin();

  const imgRes = await request(app)
    .post('/api/images')
    .set('Cookie', cookie)
    .attach('test', `${__dirname}/test-files/4.jpg`)
    .expect(400);

  expect(imgRes.body.message).toContain('Unexpected field');
});

it('rejects if file size greater than 5mb', async () => {
  const cookie = await global.signin();

  const imgRes = await request(app)
    .post('/api/images')
    .set('Cookie', cookie)
    .attach('file', `${__dirname}/test-files/car.jpg`)
    .expect(400);

  expect(imgRes.body.message).toContain('File too large');
});

it('rejects if there is not any field containing image file', async () => {
  const cookie = await global.signin();

  const imgRes = await request(app)
    .post('/api/images')
    .set('Cookie', cookie)
    .set('textField', 'Some test')
    .expect(400);

  expect(imgRes.body.message).toContain('No Image Attached');
});

import request from 'supertest';
import { app } from '../../../server';

const validMongoseId = '507f1f77bcf86cd799439011';

it('gets purhcased item', async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .get('/api/users/purchased-items')
    .set('Cookie', cookie)
    .send()
    .expect(200);
// todo finish the purchase service
});

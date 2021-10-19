import request from 'supertest';
import { app } from '../../../server';

const validMongoseId = '507f1f77bcf86cd799439011';

it('gets purhcased item', async () => {
  const cookie = await global.signin();

  // user 1 gets user2's info
  const res = await request(app)
    .get('/api/users/purchased')
    .set('Cookie', cookie)
    .send()
    .expect(200);
// todo finish the purchase service
});

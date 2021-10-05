import request from 'supertest';
import { app } from "../../../server";

it('clears the cookie after signin out', async () =>{
    const cookie = await global.signin();

    const response = await request(app)
        .post('/api/auth/signout')
        .set('Cookie', cookie)
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')[0]).not.toContain('jwt');

});

it('clears the cookie after signin out even when user not authenticated', async () =>{

    const response = await request(app)
        .post('/api/auth/signout')
        .send({})
        .expect(200);

    expect(response.get('Set-Cookie')[0]).not.toContain('jwt');

});
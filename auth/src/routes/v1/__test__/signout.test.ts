import request from 'supertest';
import { app } from '../../../app';
import { TEST_EMAIL, TEST_PASSWORD } from './constants';

it('clears the cookies after signing out', async () => {
	const response = await request(app)
		.post('/api/v1/users/signup')
		.send({ email: TEST_EMAIL, password: TEST_PASSWORD })
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();

	await request(app).post('/api/v1/users/signout').send({}).expect(200);
});

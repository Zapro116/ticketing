import request from 'supertest';
import { app } from '../../../app';
import { TEST_EMAIL, TEST_PASSWORD } from './constants';

it('fails when a email that does not exist is supplied', async () => {
	await request(app)
		.post('/api/v1/users/signin')
		.send({ email: TEST_EMAIL, password: TEST_PASSWORD })
		.expect(400);
});

it('fails when an incorrect password is supplied', async () => {
	await request(app)
		.post('/api/v1/users/signup')
		.send({ email: TEST_EMAIL, password: TEST_PASSWORD })
		.expect(201);

	await request(app)
		.post('/api/v1/users/signin')
		.send({ email: TEST_EMAIL, password: 'p' })
		.expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
	await request(app)
		.post('/api/v1/users/signup')
		.send({ email: TEST_EMAIL, password: TEST_PASSWORD })
		.expect(201);

	const response = await request(app)
		.post('/api/v1/users/signin')
		.send({ email: TEST_EMAIL, password: TEST_PASSWORD })
		.expect(200);

	expect(response.get('Set-Cookie')).toBeDefined();
});

import request from 'supertest';
import { app } from '../../../app';
import { TEST_EMAIL, TEST_PASSWORD } from './constants';

it('returns a 201 on successful signup', async () => {
	return request(app)
		.post('/api/v1/users/signup')
		.send({ email: TEST_EMAIL, password: TEST_PASSWORD })
		.expect(201);
});

it('returns a 400 with an invalid email', () => {
	return request(app)
		.post('/api/v1/users/signup')
		.send({ email: 'test', password: TEST_PASSWORD })
		.expect(400);
});

it('returns a 400 with an invalid password', () => {
	return request(app)
		.post('/api/v1/users/signup')
		.send({ email: TEST_EMAIL, password: 'p' })
		.expect(400);
});

it('returns a 400 with missing email and password', async () => {
	await request(app)
		.post('/api/v1/users/signup')
		.send({ email: TEST_EMAIL })
		.expect(400);

	await request(app)
		.post('/api/v1/users/signup')
		.send({ password: TEST_PASSWORD })
		.expect(400);
});

it('does not allow duplicate emails', async () => {
	await request(app)
		.post('/api/v1/users/signup')
		.send({ email: TEST_EMAIL, password: TEST_PASSWORD })
		.expect(201);

	return request(app)
		.post('/api/v1/users/signup')
		.send({ email: TEST_EMAIL, password: TEST_PASSWORD })
		.expect(400);
});

it('sets a cookie after successful signup', async () => {
	const response = await request(app)
		.post('/api/v1/users/signup')
		.send({ email: TEST_EMAIL, password: TEST_PASSWORD })
		.expect(201);

	expect(response.get('Set-Cookie')).toBeDefined();
});

import request from 'supertest';
import { app } from '../../../app';

it('responds with details about the current user', async () => {
	const cookie = await global.signin();

	const response = await request(app)
		.get('/api/v1/users/currentuser')
		.set('Cookie', cookie)
		.send()
		.expect(200);

	expect(response.body.currentUser.email).toEqual(global.TEST_EMAIL);
});

it('responds with null if not authenticated', async () => {
	const response = await request(app)
		.get('/api/v1/users/currentuser')
		.send()
		.expect(200);

	expect(response.body.currentUser).toBeNull();
});

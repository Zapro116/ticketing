import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
	return request(app)
		.post('/api/v1/tickets')
		.set('Cookie', global.signin())
		.send({
			title: 'concert',
			price: 20,
		})
		.expect(201);
};

it('can fetch a list of tickets', async () => {
	await createTicket();
	await createTicket();
	await createTicket();

	const response = await request(app).get('/api/v1/tickets').send().expect(200);

	expect(response.body.length).toEqual(3);
});

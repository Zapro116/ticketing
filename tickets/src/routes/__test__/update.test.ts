import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/v1/tickets/${id}`)
		.set('Cookie', global.signin())
		.send({ title: 'Abcd', price: 20 })
		.expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
	const id = new mongoose.Types.ObjectId().toHexString();

	await request(app)
		.put(`/api/v1/tickets/${id}`)
		.send({ title: 'Abcd', price: 20 })
		.expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
	const response = await request(app)
		.post('/api/v1/tickets')
		.set('Cookie', global.signin())
		.send({ title: 'Abcd', price: 20 });

	await request(app)
		.put(`/api/v1/tickets/${response.body.id}`)
		.set('Cookie', global.signin())
		.send({ title: 'Abcdef', price: 30 })
		.expect(401);
});

it('returns a 404 if the user provides an invalid title or price', async () => {
	const cookie = global.signin();
	const response = await request(app)
		.post('/api/v1/tickets')
		.set('Cookie', cookie)
		.send({ title: 'Abcd', price: 20 });

	await request(app)
		.put(`/api/v1/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ title: '', price: 20 })
		.expect(400);

	await request(app)
		.put(`/api/v1/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ title: 'Abcd', price: -20 })
		.expect(400);
});

it('updates ticket with an valid titile and price', async () => {
	const cookie = global.signin();
	const response = await request(app)
		.post('/api/v1/tickets')
		.set('Cookie', cookie)
		.send({ title: 'Abcd', price: 20 });

	await request(app)
		.put(`/api/v1/tickets/${response.body.id}`)
		.set('Cookie', cookie)
		.send({ title: 'New title', price: 200 })
		.expect(200);

	const ticketRespone = await request(app)
		.get(`/api/v1/tickets/${response.body.id}`)
		.send();

	expect(ticketRespone.body.title).toEqual('New title');
	expect(ticketRespone.body.price).toEqual(200);
});

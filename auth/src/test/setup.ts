import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

jest.setTimeout(30000);

declare global {
	var signin: () => Promise<string[]>;
	var TEST_EMAIL: string;
	var TEST_PASSWORD: string;
}

let mongo: any;

beforeAll(async () => {
	process.env.JWT_KEY = 'abcdefgh';

	mongo = await MongoMemoryServer.create();

	const mongoUri = await mongo.getUri();

	await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	if (mongo) {
		await mongo.stop();
	}
	await mongoose.connection.close();
});

global.TEST_EMAIL = 'test@test.com';
global.TEST_PASSWORD = 'password';

global.signin = async () => {
	const email = global.TEST_EMAIL;
	const password = global.TEST_PASSWORD;

	const response = await request(app)
		.post('/api/v1/users/signup')
		.send({ email, password })
		.expect(201);

	const cookie = response.get('Set-Cookie') as any;

	return cookie;
};

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

jest.setTimeout(30000);

declare global {
	var signin: () => string[];
	var TEST_EMAIL: string;
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

global.signin = () => {
	// Build a JWT payload. {id , email}

	const payload = {
		id: new mongoose.Types.ObjectId().toHexString(),
		email: global.TEST_EMAIL,
	};

	const token = jwt.sign(payload, process.env.JWT_KEY!);

	const session = { jwt: token };

	const sessionJSON = JSON.stringify(session);

	const base64 = Buffer.from(sessionJSON).toString('base64');

	return [`session=${base64}`];
};

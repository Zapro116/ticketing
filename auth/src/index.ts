import mongoose from 'mongoose';
import { app } from './app';

const port = 3000;

const start = async () => {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY must be defined');
	}
	if (!process.env.MONGO_URI) {
		throw new Error('MONGO_URI must be defined');
	}
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('connected to mongodb');
	} catch (error) {
		console.error('DB Connection error : Not connected to mongodb');
		console.error(error);
	}

	app.listen(port, () => {
		console.log(`Server listening at port : ${port}`);
	});
};

start();

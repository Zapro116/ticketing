import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@zapro-msa/common';
import { User } from '../../models/user';

const router = express.Router();

router.post(
	'/api/v1/users/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4 to 20 characters'),
	],
	validateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			console.log('Email in use');
			throw new BadRequestError('Email already in use');
		}

		const user = User.build({ email, password });
		await user.save();

		const userJwt = jwt.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_KEY!
		);

		req.session = { jwt: userJwt };

		res.status(201).send(user);
	}
);

export { router as signupRouter };

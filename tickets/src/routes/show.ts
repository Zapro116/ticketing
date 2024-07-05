import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@zapro-msa/common';

const router = express.Router();

router.get('/api/v1/tickets/:id', async (req: Request, res: Response) => {
	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		throw new NotFoundError();
	}

	return res.send(ticket);
});

export { router as showTicketRouter };

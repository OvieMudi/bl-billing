import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
import { Authenticator } from '../middleware/authenticator.middleware';

const transactionRouter = Router();

transactionRouter.post('/', [Authenticator.authenticate], TransactionController.createTransaction);

export { transactionRouter };

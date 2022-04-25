import { Router } from 'express';
import { transactionRouter } from './transaction.router';

const router = Router();

router.use('/transactions', transactionRouter);

export { router };

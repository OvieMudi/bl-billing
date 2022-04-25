import { Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import { TransactionService } from '../services/transaction.service';
import { ErrorHandler } from '../utils/errorhandler.utils';

export class TransactionController {
  public static async createTransaction(req: Request, res: Response) {
    return ErrorHandler.handleAsyncRequestError(res, async () => {
      const transaction = await TransactionService.createTransaction(<IRequest>req);

      res.json({ success: true, transaction });
    });
  }
}

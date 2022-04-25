import { Transaction } from '../db/entity/Transaction';
import { transactionRepository } from '../db/repositories';
import { IRequest } from '../interfaces/IRequest';

export class TransactionService {
  public static async createTransaction(req: IRequest) {
    const { amount } = req.body;
    const { customerId } = req;

    const transactionObject = this.createTransactionObject(customerId, amount);
    const transaction = await transactionRepository.save(transactionObject);
    console.log('TransactionService ~ createTransaction ~ transaction', transaction);
    return transaction;
  }

  public static createTransactionObject(customerId: string, amount: number) {
    const transactionObject = new Transaction();
    transactionObject.customerId = customerId;
    transactionObject.amount = amount;

    return transactionObject;
  }
}

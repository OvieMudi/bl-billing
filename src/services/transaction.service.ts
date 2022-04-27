import amqp from 'amqplib';
import dotenv from 'dotenv';
import axios from 'axios';
import { Transaction } from '../db/entity/Transaction';
import { transactionRepository } from '../db/repositories';
import { IRequest } from '../interfaces/IRequest';

dotenv.config();

const { RABBITMQ_URL, TRANSACTION_START_QUEUE, ACCOUNT_FUNDING_WEBHOOK_URL } = process.env;

export class TransactionService {
  public static async createTransaction(req: IRequest) {
    const { amount } = req.body;
    const { customerId } = req;

    const transactionObject = this.createTransactionObject(customerId, amount);
    const transaction = await transactionRepository.save(transactionObject);
    console.log('TransactionService ~ createTransaction ~ transaction', transaction);

    const connection = await amqp.connect(RABBITMQ_URL!);
    console.log('Connected to RabbitMQ');
    const channel = await connection.createChannel();
    channel.assertQueue(TRANSACTION_START_QUEUE!);
    channel.sendToQueue(TRANSACTION_START_QUEUE!, Buffer.from(JSON.stringify(transaction)));
    console.log('Pushed to queue');

    return transaction;
  }

  public static createTransactionObject(customerId: string, amount: number) {
    const transactionObject = new Transaction();
    transactionObject.customerId = customerId;
    transactionObject.amount = amount;

    return transactionObject;
  }

  public static async updateTransactionStatus(data: Transaction) {
    const transaction = await transactionRepository.findOneBy({ id: data.id });
    if (!transaction) {
      return null;
    }
    transaction.status = data.status;
    transaction.updatedAt = new Date();
    await transactionRepository.save(transaction);

    await axios.post(ACCOUNT_FUNDING_WEBHOOK_URL!, transaction)
    
    return transaction;
  }
}

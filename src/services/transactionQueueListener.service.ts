import amqp from 'amqplib';
import { TransactionService } from './transaction.service';

const { RABBITMQ_URL, TRANSACTION_COMPLETED_QUEUE } = process.env;

export class TransactionQueueListener {
  public static async Listen() {
    const connection = await amqp.connect(RABBITMQ_URL!);
    const channel = await connection.createChannel();
    await channel.assertQueue(TRANSACTION_COMPLETED_QUEUE!, { durable: true });

    channel.consume(TRANSACTION_COMPLETED_QUEUE!, async (message: any) => {
      channel.ack(message);
      const messageData = JSON.parse(message.content.toString());
      console.log('TransactionQueueListener ~ channel.consume ~ messageData', messageData);
      await TransactionService.updateTransactionStatus(messageData);
    }
    );
  }
}

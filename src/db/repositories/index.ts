import AppDataSource from "../dataSource";
import { Transaction } from "../entity/Transaction";

export const transactionRepository = AppDataSource.getRepository(Transaction);

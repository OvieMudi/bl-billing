import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
  entities: [`${__dirname}/entity/*.ts`],
  migrations: [`${__dirname}/migration/*.ts`],
  subscribers: [],
});

export const initializeDB = async () => {
  try {
    AppDataSource.initialize();
    console.log('Connected to database')
  } catch (error) {
    console.log('Database connection error: ', error);
  }
};

export const createTransaction = () => AppDataSource.manager.transaction;

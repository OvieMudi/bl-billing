import { Response } from 'express';

export class ErrorHandler {
  public static async handleAsyncRequestError(res: Response, callback: () => Promise<any>) {
    try {
      return await callback();
    } catch (error: any) {
      console.error(error.stack);
      console.error(error.message);
      return res.status(422).json({ success: false, error: 'We could not process this request for some reason.' });
    }
  }
}

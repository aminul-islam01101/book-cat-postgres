import { Response } from 'express';
import { TApiResponse } from '../types/responseTypes';

const sendResponse = <T>(res: Response, data: TApiResponse<T>): void => {
  const responseData: TApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;

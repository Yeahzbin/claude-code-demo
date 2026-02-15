import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Success'
): Response => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const createdResponse = <T>(
  res: Response,
  data: T,
  message: string = 'Created successfully'
): Response => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message: string = 'Error',
  statusCode: number = 500
): Response => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const notFoundResponse = (res: Response, message: string = 'Not found'): Response => {
  return res.status(404).json({
    success: false,
    message,
  });
};

export const unauthorizedResponse = (
  res: Response,
  message: string = 'Unauthorized'
): Response => {
  return res.status(401).json({
    success: false,
    message,
  });
};

export const validationErrorResponse = (
  res: Response,
  message: string = 'Validation error'
): Response => {
  return res.status(400).json({
    success: false,
    message,
  });
};

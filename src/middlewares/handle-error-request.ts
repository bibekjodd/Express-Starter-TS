import { HttpException } from '@/lib/exceptions';
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const handleErrorRequest: ErrorRequestHandler = (err, req, res, next) => {
  next;
  let message = err.message || 'Internal Server Error';
  let statusCode = err.statusCode || 500;
  if (err instanceof Error) {
    message = err.message || message;
  }

  if (err instanceof HttpException) {
    message = err.message;
    statusCode = err.statusCode;
  }

  if (err instanceof ZodError) {
    statusCode = 400;
    const issue = err.issues.at(0);
    if (issue) {
      let zodMessage = `${issue.path}: ${issue.message}`;
      if (zodMessage.startsWith(': ')) {
        zodMessage = zodMessage.slice(2);
      }
      message = zodMessage || message;
    }
  }

  return res.status(statusCode).json({ message });
};

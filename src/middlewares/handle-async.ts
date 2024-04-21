import { type RequestHandler } from 'express';

type HandleAsync = <Params = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>(
  requestHandler: RequestHandler<Params, ResBody, ReqBody, ReqQuery>
) => typeof requestHandler;

export const handleAsync: HandleAsync = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

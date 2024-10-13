import { ZodOpenApiPathsObject } from 'zod-openapi';

const tags = ['Default'];
export const defaultDoc: ZodOpenApiPathsObject = {
  '/': {
    get: {
      tags,
      summary: 'Check if server is running fine',
      responses: {
        200: { description: 'Server is running fine' },
        500: { description: 'Internal server error' }
      }
    }
  }
};

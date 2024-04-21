import { env } from '@/config/env.config';

export const devConsole = (...args: unknown[]) => {
  if (env.NODE_ENV !== 'production') {
    console.log(...args);
  }
};

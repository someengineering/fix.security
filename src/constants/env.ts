export const isProd = process.env.VERCEL_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';
export const isVercel = process.env.VERCEL === '1';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

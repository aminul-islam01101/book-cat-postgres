import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const configs = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  clientUrl: process.env.CLIENT,
  databaseUrl: process.env.DATABASE_URL,
  //* jwt
  jwtSecretAccess: process.env.JWT_SECRET_ACCESS_TOKEN,
  jwtSecretRefresh: process.env.JWT_SECRET_REFRESH_TOKEN,
  jwtSecretAccessExpired: process.env.JWT_SECRET_ACCESS_TOKEN_EXPIRED,
  jwtSecretRefreshExpired: process.env.JWT_SECRET_REFRESH_TOKEN_EXPIRED,
  //* google auth
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleLoginCallback: process.env.GOOGLE_LOGIN_CALLBACK,
  //* google Playground Token
  googlePlaygroundRedirect: process.env.GOOGLE_PLAYGROUND_REDIRECT,
  googlePlaygroundRefresh: process.env.GOOGLE_PLAYGROUND_REFRESH_TOKEN,

  //* nodemailer secrets
  senderEmail: process.env.SENDER_EMAIL,
  senderPass: process.env.SENDER_PASS,
};

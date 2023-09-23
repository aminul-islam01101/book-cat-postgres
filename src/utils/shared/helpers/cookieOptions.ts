import { configs } from '../../configs/env.configs';

const cookieOptions = {
  secure: configs.env === 'production',
  httpOnly: true,
};

export { cookieOptions };

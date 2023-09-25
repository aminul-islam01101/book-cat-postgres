import express from 'express';
import { UserRoutes } from './modules/auth/users/user.routes';
import { emailAuthRoutes } from './modules/auth/emailAuth/emailAuth.routes';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: emailAuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;

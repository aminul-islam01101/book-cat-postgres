import express from 'express';
import { UserRoutes } from './modules/auth/users/user.routes';
import { emailAuthRoutes } from './modules/auth/emailAuth/emailAuth.routes';
import { categoryRoutes } from './modules/categories/category.routes';
import { UserProfileRoutes } from './modules/auth/users/user.profile.routes';
import { bookRoutes } from './modules/books/book.routes';
import { orderRoutes } from './modules/orders/order.routes';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/profile',
    route: UserProfileRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: emailAuthRoutes,
  },

  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/books',
    route: bookRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
];

moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;

import express from 'express';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/books',
    // route: CowRoutes,
  },
];

// moduleRoutes.forEach((route) => routes.use(route.path, route.route));

export default routes;

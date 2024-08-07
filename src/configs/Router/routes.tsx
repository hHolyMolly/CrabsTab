import { type TypeRouter } from './router.types';

import paths from './paths';

import { Home, Login, Register, NotFound } from '@pages';

const routes: TypeRouter[] = [
  {
    path: paths.Home,
    element: <Home />,
    title: 'Home',
  },

  {
    path: paths.Login,
    element: <Login />,
    title: 'Login',
  },

  {
    path: paths.Register,
    element: <Register />,
    title: 'Register',
  },

  {
    path: '*',
    element: <NotFound />,
    title: 'Not Found',
  },
];

export default routes;

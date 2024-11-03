import { createRouter, RouterProvider } from '@tanstack/react-router';
import EmployeesPage from '../src/pages/EmployeesPage';
import CafesPage from '../src/pages/CafesPage';

const routes = [
  {
    path: '/employees',
    component: EmployeesPage,
  },
  {
    path: '/cafes',
    component: CafesPage,
  },

];

export const mockRouter = createRouter({
  routes,
});

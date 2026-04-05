import type { ComponentType } from 'react';
import HomePage from '../pages/home';
import AboutUsPage from '../pages/about-us';
import ContactsPage from '../pages/contacts';
import BlogNewsPage from '../pages/blog-news';
import VitaminsPage from '../pages/vitamins';
import VitaminDetailPage from '../pages/vitamins/VitaminDetailPage';

type AppRoute = {
  path: string;
  element: ComponentType;
};

// app routes

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    element: HomePage,
  },
  {
    path: '/about-us',
    element: AboutUsPage,
  },
  {
    path: '/vitamins/:id',
    element: VitaminDetailPage,
  },
  {
    path: '/vitamins',
    element: VitaminsPage,
  },
  {
    path: '/contacts',
    element: ContactsPage,
  },
  {
    path: '/blog-news',
    element: BlogNewsPage,
  },
];

import type { ComponentType } from 'react';
import HomePage from '../pages/home';
import AboutUsPage from '../pages/about-us';
import ContactsPage from '../pages/contacts';
import BlogNewsPage from '../pages/blog-news';
import SubscriptionsPage from '../pages/subscriptions';

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
    path: '/subscriptions',
    element: SubscriptionsPage,
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

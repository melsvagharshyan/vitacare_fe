import type { SubscriptionItem } from '../app/subscriptions/subscriptionsApi';

export const MOCK_SUBSCRIPTIONS: SubscriptionItem[] = [
  {
    id: 1,
    image:
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now00474/v/27.jpg',
    baseTitle: 'Family wellness',
    isActive: true,
    order: 0,
    createdAt: '',
    updatedAt: '',
    title: 'BIOTIN',
    description: 'Multivitamins and essentials for every member of your household.',
    buttonBg: '#ffffff',
    buttonText: 'View plan',
    buttonColor: '#1a5c4a',
  },
  {
    id: 2,
    image:
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/sol/sol03317/v/84.jpg',
    baseTitle: 'Office wellness',
    isActive: true,
    order: 1,
    createdAt: '',
    updatedAt: '',
    title: 'OFFICE WELLNESS',
    description: 'Monthly vitamin packs for teams—energy, focus, and immune support.',
    buttonBg: '#c45c26',
    buttonText: 'Get a quote',
    buttonColor: '#ffffff',
  },
  {
    id: 3,
    image:
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ntl/ntl06672/v/76.jpg',
    baseTitle: 'Personal stack',
    isActive: true,
    order: 2,
    createdAt: '',
    updatedAt: '',
    title: 'YOUR PERSONAL STACK',
    description: 'Build a custom subscription from our lab-tested vitamins and minerals.',
    buttonBg: '#1a5c4a',
    buttonText: 'Build yours',
    buttonColor: '#ffffff',
  },
];

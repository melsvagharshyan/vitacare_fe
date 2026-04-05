import type { HomeData } from '../app/home/homeApi';

export const MOCK_HOME_DATA: HomeData = {
  id: 1,
  phone: '+374123456789',
  email: 'hello@vital.am',
  weekStart: 1,
  weekEnd: 5,
  workStartTime: '09:00',
  workEndTime: '20:00',
  links: [
    {
      key: 'facebook',
      url: 'https://www.facebook.com',
      icon: '',
      label: 'Facebook',
    },
    {
      key: 'instagram',
      url: 'https://www.instagram.com',
      icon: '',
      label: 'Instagram',
    },
  ],
  createdAt: '',
  updatedAt: '',
};

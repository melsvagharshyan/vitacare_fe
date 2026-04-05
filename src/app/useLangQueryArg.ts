import { useTranslation } from 'react-i18next';
import { skipToken } from '@reduxjs/toolkit/query';
import { getCurrentLanguage } from './api';

export const useLangQueryArg = () => {
  const { i18n } = useTranslation();
  const storageLang = getCurrentLanguage();
  const activeLang = i18n.language || storageLang || 'en'; // by default is english

  return activeLang === storageLang ? activeLang : skipToken;
};

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/** App UI and API locale — Armenian only. */
export const getCurrentLanguage = () => 'hy' as const;

export const withLang = (path: string, lang?: string) => {
  const effectiveLang = lang ?? getCurrentLanguage();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `/${effectiveLang}${normalizedPath}`;
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || '',
  prepareHeaders: headers => {
    headers.set('ngrok-skip-browser-warning', 'true');
    headers.set('Accept', 'application/json');
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});

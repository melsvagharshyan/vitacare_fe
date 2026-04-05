import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { tokenStorage } from './auth/tokenStorage';
import { clearCredentials, updateToken } from './auth/authSlice';
import type { RootState } from './store';

export const getCurrentLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem('language');

  if (stored === 'hy' || stored === 'ru' || stored === 'en') {
    return stored;
  }

  return 'en';
};

export const withLang = (path: string, lang?: string) => {
  const effectiveLang = lang ?? getCurrentLanguage();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `/${effectiveLang}${normalizedPath}`;
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || '',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token || tokenStorage.getToken();

    headers.set('ngrok-skip-browser-warning', 'true');
    headers.set('Accept', 'application/json');

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = tokenStorage.getRefreshToken();

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { token, refreshToken: newRefreshToken } = refreshResult.data as {
          token: string;
          refreshToken?: string;
        };

        tokenStorage.setToken(token);

        if (newRefreshToken) {
          tokenStorage.setRefreshToken(newRefreshToken);
        }

        api.dispatch(updateToken(token));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearCredentials());
        tokenStorage.clearAll();
      }
    } else {
      api.dispatch(clearCredentials());
      tokenStorage.clearAll();
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Auth', 'User'],
});

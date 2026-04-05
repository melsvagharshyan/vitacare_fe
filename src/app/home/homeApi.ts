import { api, withLang } from '../api';

export interface HomeLink {
  key: string;
  url: string;
  icon: string;
  label: string;
}

export interface HomeData {
  id: number;
  phone: string;
  email: string;
  weekStart: number;
  weekEnd: number;
  workStartTime: string;
  workEndTime: string;
  links: HomeLink[];
  createdAt: string;
  updatedAt: string;
}

interface HomeDataResponse {
  data: HomeData;
}

export const homeApi = api.injectEndpoints({
  endpoints: builder => ({
    getHomeData: builder.query<HomeData, string | void>({
      // The query argument (language code) is used by RTK Query
      // to create separate cache entries per language and
      // to build the correct URL prefix.
      query: lang => ({
        url: withLang('/home-data/1', lang as string | undefined),
        method: 'GET',
      }),

      transformResponse: (response: HomeDataResponse) => response.data,
    }),
  }),
});

export const { useGetHomeDataQuery } = homeApi;

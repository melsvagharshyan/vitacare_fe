import { api, withLang } from '../api';

export interface BannerItem {
  id: number;
  image: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  buttonText: string;
  buttonColor: string;
  buttonBg: string;
}

interface BannerResponse {
  data: {
    count: number;
    rows: BannerItem[];
  };
}

export const bannerApi = api.injectEndpoints({
  endpoints: builder => ({
    getBanner: builder.query<BannerItem[], string | void>({
      // The query argument (language code) is used by RTK Query
      // to create separate cache entries per language and
      // to build the correct URL prefix.
      query: lang => ({
        url: withLang('/banner', lang as string | undefined),
        method: 'GET',
      }),
      transformResponse: (response: BannerResponse) => response.data.rows,
    }),
  }),
});

export const { useGetBannerQuery } = bannerApi;

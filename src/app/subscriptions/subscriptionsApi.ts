import { api, withLang } from '../api';

export interface SubscriptionItem {
  id: number;
  image: string;
  baseTitle: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  buttonBg: string;
  buttonText: string;
  buttonColor: string;
}

interface SubscriptionsResponse {
  data: {
    count: number;
    rows: SubscriptionItem[];
  };
}

export const subscriptionsApi = api.injectEndpoints({
  endpoints: builder => ({
    getSubscriptions: builder.query<SubscriptionItem[], string | void>({
      // The query argument (language code) is used by RTK Query
      // to create separate cache entries per language and
      // to build the correct URL prefix.
      query: lang => ({
        url: withLang('/subscription', lang as string | undefined),
        method: 'GET',
      }),
      transformResponse: (response: SubscriptionsResponse) => response.data.rows,
    }),
  }),
});

export const { useGetSubscriptionsQuery } = subscriptionsApi;

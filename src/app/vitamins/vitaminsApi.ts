import { api, withLang } from '../api';

export interface VitaminItem {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}

interface VitaminsResponse {
  data: {
    count: number;
    rows: VitaminItem[];
  };
}

export const vitaminsApi = api.injectEndpoints({
  endpoints: builder => ({
    getVitamins: builder.query<VitaminItem[], string | void>({
      query: lang => ({
        url: withLang('/subscription', lang as string | undefined),
        method: 'GET',
      }),
      transformResponse: (response: VitaminsResponse) => response.data.rows,
    }),
  }),
});

export const { useGetVitaminsQuery } = vitaminsApi;

import { api } from '../api';
import { clearCredentials, updateToken } from './authSlice';
import { tokenStorage } from './tokenStorage';

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
}

interface RequestOtpRequest {
  identifier: string;
}

interface VerifyOtpRequest {
  identifier: string;
  code: string;
}

interface VerifyOtpResponse {
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: body => ({
        url: '/auth/refresh',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          tokenStorage.setToken(data.token);
          if (data.refreshToken) {
            tokenStorage.setRefreshToken(data.refreshToken);
          }

          dispatch(updateToken(data.token));
        } catch (error) {
          dispatch(clearCredentials());
          tokenStorage.clearAll();
        }
      },
    }),

    requestOtp: builder.mutation<void, RequestOtpRequest>({
      query: body => ({
        url: '/auth/request-otp',
        method: 'POST',
        body,
      }),
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: body => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          tokenStorage.setToken(data.data.accessToken);
          if (data.data.refreshToken) {
            tokenStorage.setRefreshToken(data.data.refreshToken);
          }

          dispatch(updateToken(data.data.accessToken));
        } catch (error) {
          console.error('Verify OTP failed:', error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenMutation, useRequestOtpMutation, useVerifyOtpMutation } = authApi;

import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import authReducer from './auth/authSlice';
import { tokenStorage } from './auth/tokenStorage';
import type { User } from './auth/authSlice';

const preloadedState = {
  auth: {
    token: tokenStorage.getToken(),
    refreshToken: tokenStorage.getRefreshToken(),
    user: tokenStorage.getUser() as User | null,
    isAuthenticated: !!tokenStorage.getToken(),
  },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

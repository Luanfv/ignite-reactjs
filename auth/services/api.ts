import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

let cookies = parseCookies();
let isRefreshing = false;
let failRequestQueue: { resolve: (token: string) => void; reject: (err: AxiosError<any, any>) => void; }[] = [];

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        cookies = parseCookies();

        const { 'nextauth.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api.post('/refresh', {
            refreshToken,
          }).then((response) => {
            setCookie(
              undefined,
              'nextauth.token',
              response.data.token,
              {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              },
            );
      
            setCookie(
              undefined,
              'nextauth.refreshToken',
              response.data.refreshToken,
              {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              },
            );
  
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            failRequestQueue.forEach((request) => request.resolve(response.data.token));
            failRequestQueue = [];
          }).catch(() => {
            failRequestQueue.forEach((request) => request.reject(error));
            failRequestQueue = [];
          }).finally(() => {
            isRefreshing = false;
          });

          return new Promise((resolve, reject) => {
            failRequestQueue.push({
              resolve: (token: string) => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`;

                resolve(api(originalConfig));
              },
              reject: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        }

        return;
      }


    }
  }
);

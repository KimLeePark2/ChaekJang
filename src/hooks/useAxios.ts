import { useCallback } from 'react';
import axios from 'axios';
import useToken from './useToken';

const BASE_URL = 'http://43.201.203.197:53103/api';

export default function useAxios() {
  const { token } = useToken('accessToken');

  axios.defaults.baseURL = BASE_URL;

  const requestApi = useCallback(
    async <T extends {}>(
      method: 'get' | 'post' | 'patch' | 'put' | 'delete',
      url: string,
      body?: object,
      header?: object,
    ) => {
      return axios[method](url, body, {
        headers: {
          'Content-Type': 'application/json',
          ...header,
        },
      })
        .then(res => ({
          data: res.data as T,
          status: res.status,
        }))
        .catch(err => {
          console.error('[RequestApi Error]', err);

          return {
            data: {} as T,
            status: -1,
          };
        });
    },
    [],
  );

  const requestSecureApi = useCallback(
    async <T extends {}>(
      method: 'get' | 'post' | 'patch' | 'put' | 'delete',
      url: string,
      body?: object,
      header?: object,
    ) => {
      return requestApi<T>(method, url, body, {
        Authorization: `Bearer ${token}`,
        ...header,
      });
    },
    [requestApi, token],
  );

  return {
    requestApi,
    requestSecureApi,
  };
}

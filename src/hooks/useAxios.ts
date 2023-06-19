import { useCallback } from 'react';
import axios from 'axios';
import type { requestNewBookApiBody } from 'src/@types/api';
import tokenStorage from '@storages/tokenStorage';

const BASE_URL = 'http://43.201.203.197:53103/api';

export default function useAxios() {
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
      const accessToken = await tokenStorage
        .get('accessToken')
        .then(res => res);

      return requestApi<T>(method, url, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          ...header,
        },
      });
    },
    [requestApi],
  );

  const requestNewBookApi = useCallback(
    async <T extends {}>(url: string, body: requestNewBookApiBody) => {
      const accessToken = await tokenStorage
        .get('accessToken')
        .then(res => res);

      const formData = new FormData();
      formData.append('thumbnailImage', {
        uri: body.photo[0].uri,
        type: body.photo[0].type,
        name: body.photo[0].fileName,
      });
      formData.append('userId', body.userId);
      formData.append('title', body.title);
      formData.append('price', body.price);
      formData.append('description', body.description);

      return axios
        .post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(res => ({
          data: res.data as T,
          status: res.status,
        }))
        .catch(err => {
          console.error('[RequestNewBookApi Error]', err);
          return {
            data: {} as T,
            status: -1,
          };
        });
    },
    [],
  );

  return {
    requestApi,
    requestSecureApi,
    requestNewBookApi,
  };
}

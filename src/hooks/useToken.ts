import { useCallback } from 'react';

export type TokenTypes = {
  accessToken: string;
  refreshToken: string;
};

export default function useToken() {
  const getToken = useCallback(<K extends keyof TokenTypes>(key: K) => {
    console.log(key);
  }, []);

  const __setTokenInAsyncStorage = useCallback(() => {}, []);

  return { getToken, __setTokenInAsyncStorage };
}

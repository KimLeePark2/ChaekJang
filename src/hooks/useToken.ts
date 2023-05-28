import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';

type TokenTypes = Pick<KakaoOAuthToken, 'accessToken' | 'refreshToken'>;

export default function useToken<K extends keyof TokenTypes>(key: K) {
  const [token, setToken] = useState<string | null>(null);

  const __getTokenInAsyncStorage = useCallback(async () => {
    try {
      const getToken = await AsyncStorage.getItem(key);
      setToken(getToken);
    } catch (err) {
      console.error('getToken err', err);
    }
  }, [key]);

  const __setTokenInAsyncStorage = useCallback(
    async (value: string) => {
      try {
        await AsyncStorage.setItem(key, value);
        setToken(value);
      } catch (err) {
        console.error('__setTokenInAsyncStorage err', err);
      }
    },
    [key],
  );

  const __clearTokenInAsyncStorage = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(key);
      setToken(null);
    } catch (err) {
      console.error('__setTokenInAsyncStorage err', err);
    }
  }, [key]);

  useEffect(() => {
    __getTokenInAsyncStorage();
  }, [__getTokenInAsyncStorage]);

  return {
    token,
    __setTokenInAsyncStorage,
    __clearTokenInAsyncStorage,
  };
}

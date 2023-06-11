import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { KakaoOAuthToken } from '@react-native-seoul/kakao-login';

type TokenTypes = Pick<KakaoOAuthToken, 'accessToken' | 'refreshToken'>;

export default function useToken<K extends keyof TokenTypes>(key: K) {
  const [token, setToken] = useState<string | null>(null);

  const __getTokenInAsyncStorage = async () => {
    const temp = await AsyncStorage.getItem(key).then(res => res);
    return temp;
  };

  const __setTokenInAsyncStorage = useCallback(
    async (value: string) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
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

  return {
    token,
    __getTokenInAsyncStorage,
    __setTokenInAsyncStorage,
    __clearTokenInAsyncStorage,
  };
}

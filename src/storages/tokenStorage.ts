import AsyncStorage from '@react-native-community/async-storage';

type TokenTypes = 'accessToken' | 'refreshToken';

const tokenStorage = {
  async get(key: TokenTypes) {
    try {
      const getToken = await AsyncStorage.getItem(key);
      return getToken ? JSON.parse(getToken) : null;
    } catch (e) {
      throw new Error('Failed to get token');
    }
  },
  async set(key: TokenTypes, value: string | null) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw new Error('Failed to set token');
    }
  },
};

export default tokenStorage;

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useToken from '@hooks/useToken';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuItem from '@components/MyPage/MenuItem';
import useAxios from '@hooks/useAxios';

const Profile = () => {
  const {
    __getTokenInAsyncStorage,
    __clearTokenInAsyncStorage: clearAccessToken,
  } = useToken('accessToken');
  const { __clearTokenInAsyncStorage: clearRefreshToken } =
    useToken('refreshToken');
  const { requestSecureApi } = useAxios();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MyPageStackParamsType & RootStackParamsType>
    >();
  const [token, setToken] = useState<string | null>(null);
  const [inputs, setInputs] = useState({
    nickname: '',
  });
  const [reload, setReload] = useState(0);

  const getProfile = useCallback(async () => {
    const { data, status } = await requestSecureApi<{ nickname: string }>(
      'get',
      '/v1/users',
    );

    if (status === 200) {
      console.log(data);
      setInputs(data);
    }
  }, [requestSecureApi]);

  const onPressLogin = () => {
    navigation.navigate('SignIn');
  };

  const onPressLogout = async () => {
    try {
      clearAccessToken();
      clearRefreshToken();
    } catch (err) {
      console.error('로그아웃 실패');
    }
    setReload(prev => prev + 1);
  };

  const onSalesHistory = () => navigation.navigate('SalesHistory');
  const onWishList = () => navigation.navigate('WishList');

  useEffect(() => {
    const temp = async () => {
      const accessToken = await __getTokenInAsyncStorage();
      setToken(accessToken);

      if (accessToken) {
        getProfile();
      }
    };

    temp();
  }, [__getTokenInAsyncStorage, getProfile, reload]);

  return (
    <View style={styles.container}>
      {token ? (
        <View style={styles.profileContainer}>
          <View style={styles.nicknameContainer}>
            <Text style={styles.subtitle}>안녕하세요!</Text>
            <Text style={styles.nickname}>닉네임님</Text>
          </View>
          <Pressable>
            <Text>내 프로필 보기</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.profileContainer}>
          <View style={styles.nicknameContainer}>
            <Text style={styles.subtitle}>로그인 후 이용해 주세요.</Text>
          </View>
          <Pressable onPress={onPressLogin}>
            <Text>로그인 하기</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.navigationContainer}>
        <MenuItem name="판매내역" onPress={onSalesHistory} />
        <MenuItem name="관심목록" onPress={onWishList} />
        {token && (
          <Pressable onPress={onPressLogout}>
            <Text>로그아웃</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: '#f1f1f1',
  },
  profileContainer: {
    gap: 10,
    padding: 30,
    backgroundColor: '#fff',
  },
  nicknameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  subtitle: {
    fontSize: 22,
    color: '#403321',
  },
  nickname: {
    fontSize: 22,
    fontWeight: '900',
    color: '#403321',
  },
  navigationContainer: {
    flex: 1,
    paddingVertical: 25,
    backgroundColor: '#fff',
  },
  navigation: {},
  navigationTitle: {
    fontSize: 18,
    color: '#000',
  },
});

export default Profile;

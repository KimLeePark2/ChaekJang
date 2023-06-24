import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuItem from '@components/MyPage/MenuItem';
import tokenStorage from '@storages/tokenStorage';
import useAxios from '@hooks/useAxios';
import type { IUser } from 'src/@types/user';

const Profile = () => {
  const isFocused = useIsFocused();
  const { requestSecureApi } = useAxios();
  const [token, setToken] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [userId, setUserId] = useState('');
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MyPageStackParamsType & RootStackParamsType>
    >();

  // 로그아웃
  const onPressLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시나요?', [
      { text: '취소', onPress: () => {}, style: 'cancel' },
      {
        text: '로그아웃',
        onPress: () => {
          tokenStorage.set('accessToken', null);
          tokenStorage.set('refreshToken', null);
          setToken(null);
        },
        style: 'destructive',
      },
    ]);
  };

  // 내 정보 조회
  const getUserProfile = async () => {
    const { data, status } = await requestSecureApi<IUser>(
      'get',
      '/auths/my',
    );
    if (status === 200) {
      setNickname(data.nickname);
      setUserId(data.id);
    }
  };

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);

  useEffect(() => {
    tokenStorage.get('accessToken').then(setToken);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {token !== null ? (
        <View style={styles.profileContainer}>
          <View style={styles.nicknameContainer}>
            <Text style={styles.subtitle}>안녕하세요!</Text>
            <Text style={styles.nickname}>{nickname}님</Text>
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
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text>로그인 하기</Text>
          </Pressable>
        </View>
      )}
      {token && (
        <View style={styles.navigationContainer}>
          <MenuItem
            name="판매내역"
            onPress={() => navigation.navigate('SalesHistory', { userId })}
          />
          <MenuItem
            name="관심목록"
            onPress={() => navigation.navigate('WishList', { userId })}
          />
          <MenuItem name="로그아웃" onPress={onPressLogout} />
        </View>
      )}
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

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MenuItem from '@components/MyPage/MenuItem';
import tokenStorage from '@storages/tokenStorage';

const Profile = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MyPageStackParamsType & RootStackParamsType>
    >();
  const [token, setToken] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  // 로그아웃
  const onPressLogout = async () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시나요?', [
      { text: '닫기', onPress: () => {}, style: 'cancel' },
      {
        text: '로그아웃',
        onPress: () => {
          tokenStorage.set('accessToken', null);
          tokenStorage.set('refreshToken', null);
          setReload(prev => prev + 1);
        },
        style: 'destructive',
      },
    ]);
  };

  useEffect(() => {
    tokenStorage.get('accessToken').then(setToken);
  }, [reload]);

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
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text>로그인 하기</Text>
          </Pressable>
        </View>
      )}
      {token && (
        <View style={styles.navigationContainer}>
          <MenuItem
            name="판매내역"
            onPress={() => navigation.navigate('SalesHistory')}
          />
          <MenuItem
            name="관심목록"
            onPress={() => navigation.navigate('WishList')}
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

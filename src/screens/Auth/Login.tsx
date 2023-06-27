import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAxios from '@hooks/useAxios';
import { getProfile, login } from '@react-native-seoul/kakao-login';
import KAKAO_LOGIN_BUTTON_IMAGE from 'src/assets/images/kakao_login_medium_wide.png';
import ChevronLeft from 'src/assets/svgs/chevron-left.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tokenStorage from '@storages/tokenStorage';

// 카카오 로그인 라이브러리
// https://github.com/crossplatformkorea/react-native-kakao-login
const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamsType>>();
  const { requestApi } = useAxios();

  const onPressLogin = async () => {
    try {
      // 카카오 로그인 요청
      await login();
      const profile = await getProfile();

      // 카카오 로그인 성공 시 반환 받은 id를 이용하여 서버에 요청
      const { data: loginData, status: loginStatus } = await requestApi<{
        [key in 'accessToken' | 'refreshToken']: string;
      }>('post', '/auths/login', {
        provider: 'KAKAO',
        providerId: profile.id,
      });

      if (loginStatus === 200) {
        // 등록된 유저인 경우 토큰 저장 후 이전 페이지
        tokenStorage.set('accessToken', loginData.accessToken);
        tokenStorage.set('refreshToken', loginData.refreshToken);
        navigation.goBack();
      } else {
        // 등록되지 않은 유저인 경우 유저 POST 요청
        const { data, status } = await requestApi<{
          [key in 'accessToken' | 'refreshToken']: string;
        }>('post', '/auths/join', {
          name: '',
          nickname: profile.nickname,
          provider: 'KAKAO',
          providerId: profile.id,
          phone: '',
        });
        if (status === 201) {
          tokenStorage.set('accessToken', data.accessToken);
          tokenStorage.set('refreshToken', data.refreshToken);
          navigation.goBack();
        } else {
          console.error('[POST] /v1/users', status);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <View style={{ alignItems: 'flex-start', width: '100%' }}>
        <Pressable onPress={() => navigation.pop()}>
          <ChevronLeft color={'#48BA95'} />
        </Pressable>
      </View>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.subtitle}>믿을 수 있는 중고서점</Text>
          <Text style={styles.title}>책장정리</Text>
        </View>
        <Pressable onPress={onPressLogin} style={styles.loginPressable}>
          <Image source={KAKAO_LOGIN_BUTTON_IMAGE} style={styles.loginImage} />
        </Pressable>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#403321',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#403321',
  },
  loginPressable: {
    width: '100%',
  },
  loginImage: {
    width: '100%',
    resizeMode: 'contain',
  },
});

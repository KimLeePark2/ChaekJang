import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useToken from '@hooks/useToken';
import useAxios from '@hooks/useAxios';
import { getProfile, login } from '@react-native-seoul/kakao-login';
import KAKAO_LOGIN_BUTTON_IMAGE from '@assets/images/kakao_login_large_wide.png';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 카카오 로그인 라이브러리
// https://github.com/crossplatformkorea/react-native-kakao-login
const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamsType>>();
  const { __setTokenInAsyncStorage: setAccessToken } = useToken('accessToken');
  const { __setTokenInAsyncStorage: setRefreshToken } =
    useToken('refreshToken');
  const { requestSecureApi } = useAxios();

  const onPressLogin = async () => {
    try {
      const token = await login();
      const profile = await getProfile();

      // AsyncStorage token 저장
      setAccessToken(token.accessToken);
      setRefreshToken(token.refreshToken);

      // // POST : 프로필 정보
      // const { status } = await requestSecureApi('post', '/v1/users', {
      //   name: '',
      //   nickname: profile.nickname,
      //   provider: 'KAKAO',
      //   providerId: profile.id,
      //   phone: '',
      // });

      // if (status === 200) {
      //   console.log('성공');
      //   navigation.goBack();
      // }

      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>믿을 수 있는 중고서점</Text>
        <Text style={styles.title}>책장정리</Text>
      </View>
      <Pressable onPress={onPressLogin} style={styles.loginPressable}>
        <Image source={KAKAO_LOGIN_BUTTON_IMAGE} style={styles.loginImage} />
      </Pressable>
    </View>
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

import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
} from '@react-native-seoul/kakao-login';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'SignIn'>;

// @FIXSUJIN
const SignIn: React.FC<PropsType> = ({}) => {
  const [result, setResult] = useState<string>('');

  // 로그인
  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
    } catch (err) {
      console.error('login err', err);
    }
  };

  const signOutWithKakao = async (): Promise<void> => {
    try {
      const message = await logout();

      setResult(message);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  // 프로필 가져오기
  const getProfile = async (): Promise<void> => {
    try {
      const profile = await getKakaoProfile();

      setResult(JSON.stringify(profile));
      console.log(profile);
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  return (
    <View>
      <Text>{result}</Text>
      <Pressable
        onPress={() => {
          signInWithKakao();
        }}
      >
        <Text>카카오 로그인</Text>
      </Pressable>
      <Pressable onPress={() => getProfile()}>
        <Text>프로필 조회</Text>
      </Pressable>
      <Pressable onPress={() => signOutWithKakao()}>
        <Text>카카오 로그아웃</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

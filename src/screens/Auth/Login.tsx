import React from 'react';
import styled from '@emotion/native';
import KAKAO_LOGIN_LOGO_IMAGE from '@assets/images/kakao_login_large_wide.png';
import { getProfile, login } from '@react-native-seoul/kakao-login';
import { TokenTypes } from '@hooks/useToken';

const Login = () => {
  const onPressLogin = async () => {
    try {
      const token: TokenTypes = await login();
      const profile = await getProfile();

      console.log('token', token);
      console.log('profile', profile);

      // token aysnc storage 저장
      // 프로필 불러오기 (닉네임) -> id, 닉네임 서버 저장
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <LoginPressable onPress={onPressLogin}>
        <LoginImage source={KAKAO_LOGIN_LOGO_IMAGE} />
      </LoginPressable>
    </Container>
  );
};

export default Login;

const Container = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  padding: 20px;
`;

const LoginPressable = styled.Pressable`
  width: 100%;
  height: auto;
`;

const LoginImage = styled.Image`
  width: 100%;
  resize-mode: contain;
`;

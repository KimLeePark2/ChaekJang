import { login } from '@react-native-seoul/kakao-login';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Button } from 'react-native';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'SignIn'>;

const SignIn: React.FC<PropsType> = ({}) => {
  const [result, setResult] = useState<string>('');

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
    } catch (err) {
      console.error('login err', err);
    }
  };

  console.log(result);

  return (
    <View>
      <Button title="로그인" onPress={signInWithKakao} />
    </View>
  );
};

export default SignIn;

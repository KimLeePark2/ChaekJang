import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'SignIn'>;

const SignIn: React.FC<PropsType> = ({ navigation }) => {
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <View
        style={{
          height: 30,
          paddingHorizontal: 10,
        }}
      >
        <Pressable onPress={onPressBack}>
          <Text style={{ color: 'blue', fontSize: 24 }}>{'<'}</Text>
        </Pressable>
      </View>
      <Text>SignIn hi</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {},
});

export default SignIn;

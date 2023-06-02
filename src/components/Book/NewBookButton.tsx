import useToken from '@hooks/useToken';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet, Pressable, Platform, Alert } from 'react-native';
import Plus from 'src/assets/svgs/plus.svg';

const NewBookButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsType>>();
  const { token: accessToken } = useToken('accessToken');
  const { token: refreshToken } = useToken('refreshToken');

  const onPressPlus = () => {
    if (accessToken && refreshToken) {
      navigation.navigate('NewBook');
      return;
    }
    Alert.alert('로그인 후 이용바랍니다.');
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPressPlus}
        style={({ pressed }) => [
          styles.button,
          Platform.OS === 'ios' && {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
      >
        <Plus style={styles.plus} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 46,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#4D4D4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    overflow: Platform.select({ android: 'hidden' }),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#48BA95',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    color: 'white',
  },
});

export default NewBookButton;

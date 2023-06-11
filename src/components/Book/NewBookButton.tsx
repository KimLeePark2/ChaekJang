import useToken from '@hooks/useToken';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import Plus from 'src/assets/svgs/plus.svg';

type PropsType = {
  hidden: boolean;
};

const NewBookButton: React.FC<PropsType> = ({ hidden }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsType>>();
  const animation = useRef(new Animated.Value(0)).current;
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

  useEffect(() => {
    Animated.spring(animation, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
      tension: 45,
      friction: 5,
    }).start();
  }, [animation, hidden]);

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 88],
            }),
          },
        ],
        opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0],
        }),
      }}
    >
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
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

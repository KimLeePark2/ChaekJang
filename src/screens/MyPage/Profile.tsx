import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import MenuItem from '@components/MyPage/MenuItem';

const Profile = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<MyPageStackParamsType & RootStackParamsType>
    >();

  const onPressSignIn = () => {
    navigation.navigate('SignIn');
  };
  const onSalesHistory = () => navigation.navigate('SalesHistory');
  const onWishList = () => navigation.navigate('WishList');

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.nicknameContainer}>
          <Text style={styles.subtitle}>안녕하세요!</Text>
          <Text style={styles.nickname}>닉네임님</Text>
        </View>
        <Pressable>
          <Text>내 프로필 보기</Text>
        </Pressable>
      </View>
      <View style={styles.navigationContainer}>
        <MenuItem name="판매내역" onPress={onSalesHistory} />
        <MenuItem name="관심목록" onPress={onWishList} />
        <MenuItem name="sign-in page" onPress={onPressSignIn} />
      </View>
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

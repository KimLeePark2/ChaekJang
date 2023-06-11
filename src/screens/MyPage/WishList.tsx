import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChevronLeft from 'src/assets/svgs/chevron-left.svg';
import BookList from '@components/Book/BookList';

type PropsType = NativeStackScreenProps<MyPageStackParamsType, 'WishList'>;

const WishList: React.FC<PropsType> = ({ navigation }) => {
  const onPressBack = () => navigation.goBack();
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onPressBack}>
          <ChevronLeft style={styles.headerIcon} />
        </Pressable>
        <Text style={styles.title}>관심목록</Text>
      </View>
      {/* <View style={styles.body}>
        <Text style={styles.contents}>아직 관심 목록이 없어요</Text>
      </View> */}
      <View>
        <BookList/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  headerIcon: {
    color: '#48BA95',
  },
  title: {
    position: 'absolute',
    left: '40%',
    fontSize: 18,
  },
  body: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
  },
  contents: {
    fontSize: 16,
  },
});

export default WishList;

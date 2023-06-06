import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChevronLeft from 'src/assets/svgs/chevron-left.svg';
import BookList from '@components/Book/BookList';

type PropsType = NativeStackScreenProps<MyPageStackParamsType, 'SalesHistory'>;

const SalesHistory: React.FC<PropsType> = ({ navigation }) => {
  const [hidden, setHidden] = useState(false);
  const onPressBack = () => navigation.goBack();
  const onScrolledToBottom = (isBottom: boolean) => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };
  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onPressBack}>
          <ChevronLeft style={styles.headerIcon} />
        </Pressable>
        <Text style={styles.title}>나의 판매내역</Text>
      </View>
      {/* <View style={styles.body}>
        <Text style={styles.contents}>판매중인 게시글이 없어요</Text>
      </View> */}
      <View>
        <BookList onScrolledToBottom={onScrolledToBottom} />
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
    left: '36%',
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

export default SalesHistory;


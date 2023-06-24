import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChevronLeft from 'src/assets/svgs/chevron-left.svg';
import BookList from '@components/Book/BookList';
import useUserAPI from '@hooks/useUserAPI';
import type { Content } from 'src/@types/book';

type PropsType = NativeStackScreenProps<MyPageStackParamsType, 'WishList'>;

const WishList: React.FC<PropsType> = ({ navigation, route }) => {
  const userId: string = route.params?.userId;
  const onPressBack = () => navigation.goBack();
  const [products, setProducts] = useState<Content[]>([]);
  const pageNumber = 1;
  const { getMyWishes } = useUserAPI();

  const initialGetProducts = useCallback(async () => {
    const response = await getMyWishes(pageNumber, userId);
    if (response.status === 200) {
      setProducts(response.data.content);
    }
  }, []);

  useEffect(() => {
    initialGetProducts();
  }, []);

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onPressBack}>
          <ChevronLeft style={styles.headerIcon} />
        </Pressable>
        <Text style={styles.title}>관심목록</Text>
      </View>
      <View>
        { products?.length === 0 ? (
          <Text style={styles.contents}>아직 관심 목록이 없어요</Text>
          ) : (
          <BookList data={products}/>
        )}
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

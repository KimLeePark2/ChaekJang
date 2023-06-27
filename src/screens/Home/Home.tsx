import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookList from '@components/Book/BookList';
import NewBookButton from '@components/Book/NewBookButton';
import useBookAPI from '@hooks/useBookAPI';
import type { Content } from 'src/@types/book';
import { Text } from 'react-native-svg';

const Home = () => {
  const [hidden, setHidden] = useState(false);
  const [products, setProducts] = useState<Content[]>([]);
  const pageNumber = useRef(1);
  const done = useRef(false);
  const { getProducts } = useBookAPI();

  const initialGetProducts = useCallback(async () => {
    const response = await getProducts(pageNumber.current);
    if (response.status === 200) {
      pageNumber.current += 1;
      setProducts(response.data.content);
    }
  }, [getProducts]);

  useEffect(() => {
    initialGetProducts();
  }, []);

  if (products.length === 0) {
    return (
      <SafeAreaView edges={['bottom']} style={styles.safeAreaViewContainer}>
        <View>
          <Text>상품이 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const onScrolledToBottom = async (isBottom: boolean) => {
    if (isBottom) {
      if (!done.current) {
        const response = await getProducts(pageNumber.current);
        if (response.status === 200) {
          if (response.data.totalPages === pageNumber.current) {
            done.current = true;
          } else {
            pageNumber.current += 1;
          }
          setProducts([...products, ...response.data.content]);
        }
      } else {
        setHidden(isBottom);
      }
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeAreaViewContainer}>
      <View>
        {products.length && (
          <BookList data={products} onScrolledToBottom={onScrolledToBottom} />
        )}
      </View>
      <NewBookButton hidden={hidden} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
});

export default Home;

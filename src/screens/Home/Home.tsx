import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookList from '@components/Book/BookList';
import NewBookButton from '@components/Book/NewBookButton';

const Home = () => {
  const [hidden, setHidden] = useState(false);

  const onScrolledToBottom = (isBottom: boolean) => {
    if (hidden !== isBottom) {
      setHidden(isBottom);
    }
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeAreaViewContainer}>
      <View>
        <BookList onScrolledToBottom={onScrolledToBottom} />
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

import React, { useCallback } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import BookItem from './BookItem';
import type { Content } from 'src/@types/book';

type PropsType = {
  data?: Content[];
  onScrolledToBottom?: (isBottom: boolean) => void;
};

const BookList: React.FC<PropsType> = ({ data, onScrolledToBottom }) => {
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!onScrolledToBottom) {
      return;
    }

    const { contentSize, layoutMeasurement, contentOffset } = e.nativeEvent;
    const distanceFromBottom =
      contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (distanceFromBottom < 72) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };

  const separator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <BookItem {...item} />}
        ItemSeparatorComponent={separator}
        keyExtractor={item => item.id.toString()}
        onScroll={onScroll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default BookList;

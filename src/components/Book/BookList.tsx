import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BookItem from './BookItem';
import { DUMMY } from './DUMMY';
import type { IBookItem } from 'src/@types/book';

type PropsType = {
  data?: IBookItem[];
};

const BookList: React.FC<PropsType> = ({ data = DUMMY }) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <BookItem {...item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default BookList;

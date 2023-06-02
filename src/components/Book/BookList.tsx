import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BookItem from './BookItem';
import { DUMMY } from './DUMMY';
import type { IBookItem } from 'src/@types/book';

type PropsType = {
  data?: IBookItem[];
  searchValue?: string;
};

const BookList: React.FC<PropsType> = ({ searchValue, data = DUMMY }) => {
  const [renderData, setRenderData] = useState(data);
  React.useEffect(() => {
    if (searchValue) {
      setRenderData(prev => {
        return prev.filter(item => item.title.includes(searchValue));
      });
    }
  }, [searchValue]);

  return (
    <View>
      <FlatList
        data={renderData}
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

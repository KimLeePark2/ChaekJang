import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BookItem from './BookItem';
import { DUMMY } from './DUMMY';
import { onPressBookDetailType } from 'src/@types/book';

type PropsType = onPressBookDetailType;

const BookList: React.FC<PropsType> = ({ onPressBookDetail }) => {
  return (
    <View>
      <FlatList
        data={DUMMY}
        renderItem={({ item }) => (
          <BookItem {...item} onPressBookDetail={onPressBookDetail} />
        )}
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

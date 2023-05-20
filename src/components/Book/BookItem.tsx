import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getFormattedCreatedAt } from 'src/utils/format';
import type { IBookItem } from 'src/@types/book';

const BookItem: React.FC<IBookItem> = ({
  thumbnailImage,
  title,
  price,
  wishCount,
  isSoldOut,
  createdAt,
}) => {
  return (
    <View style={styles.item}>
      <Image source={thumbnailImage} style={styles.image} />
      <View style={styles.container}>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.createdAt}>{getFormattedCreatedAt(createdAt)}</Text>
        <View style={styles.priceContainer}>
          {isSoldOut && <Text style={styles.isSoldOut}>판매완료</Text>}
          <Text style={styles.price}>{price.toLocaleString()}원</Text>
        </View>
        <View style={styles.spacing} />
        <Text style={styles.wishCount}>{wishCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  container: {
    height: 100,
    flex: 1,
    gap: 5,
  },
  title: {
    fontSize: 18,
  },
  createdAt: {
    fontSize: 12,
    color: '#8E8E8E',
  },
  price: {
    fontSize: 16,
  },
  wishCount: {
    alignSelf: 'flex-end',
    color: '#BFBFBF',
  },
  spacing: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  isSoldOut: {
    padding: 5,
    backgroundColor: '#EFEFEF',
  },
});

export default BookItem;

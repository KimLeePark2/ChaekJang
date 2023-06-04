import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFormattedCreatedAt } from '@utils/format';
import type { IBookItem } from 'src/@types/book';
import Star from '@assets/svgs/star.svg';

type PropsType = IBookItem;

const BookItem: React.FC<PropsType> = ({
  id,
  thumbnailImage,
  title,
  price,
  wishCount,
  isSoldOut,
  createdAt,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsType>>();

  return (
    <Pressable onPress={() => navigation.navigate('BookDetail', { id })}>
      <View style={styles.item}>
        <Image source={thumbnailImage} style={styles.image} />
        <View style={styles.container}>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
            {title}
          </Text>
          <Text style={styles.createdAt}>
            {getFormattedCreatedAt(createdAt)}
          </Text>
          <View style={styles.priceContainer}>
            {isSoldOut && <Text style={styles.isSoldOut}>판매완료</Text>}
            <Text style={styles.price}>{price.toLocaleString()}원</Text>
          </View>
          <View style={styles.spacing} />
          <View style={styles.wishCountContainer}>
            <Star stroke={'#BFBFBF'} />
            <Text style={styles.wishCount}>{wishCount}</Text>
          </View>
        </View>
      </View>
    </Pressable>
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
  wishCountContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  wishCount: {
    color: '#BFBFBF',
  },
  spacing: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  isSoldOut: {
    padding: 5,
    backgroundColor: '#EFEFEF',
  },
});

export default BookItem;

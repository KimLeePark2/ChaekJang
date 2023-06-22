import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getFormattedCreatedAt } from '@utils/format';
import type { Content } from 'src/@types/book';
import Star from '@assets/svgs/star.svg';

type PropsType = Content;

const BookItem: React.FC<PropsType> = ({
  id,
  thumbnailImagePaths,
  title,
  price,
  wishes,
  status,
  createdAt = '2023-06-20T11:25:44.973',
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsType>>();

  return (
    <Pressable onPress={() => navigation.navigate('BookDetail', { id })}>
      <View style={styles.item}>
        <Image source={{ uri: thumbnailImagePaths[0] }} style={styles.image} />
        <View style={styles.container}>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
            {title}
          </Text>
          <Text style={styles.createdAt}>
            {createdAt && getFormattedCreatedAt(createdAt)}
          </Text>
          <View style={styles.priceContainer}>
            {status && <Text style={styles.status}>판매완료</Text>}
            <Text style={styles.price}>{price.toLocaleString()}원</Text>
          </View>
          <View style={styles.spacing} />
          <View style={styles.wishesContainer}>
            <Star stroke={'#BFBFBF'} />
            <Text style={styles.wishes}>{wishes}</Text>
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
  wishesContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  wishes: {
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
  status: {
    padding: 5,
    backgroundColor: '#EFEFEF',
  },
});

export default BookItem;

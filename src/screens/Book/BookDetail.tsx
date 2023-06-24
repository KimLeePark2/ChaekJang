import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChevronLeft from 'src/assets/svgs/chevron-left.svg';
import { getFormattedCreatedAt } from '@utils/format';
import type { Content } from 'src/@types/book';
import useBookAPI from '@hooks/useBookAPI';
import Star from '@assets/svgs/star2.svg';
import More from '@assets/svgs/more-vertical.svg';
import ActionSheetModal from 'src/components/ActionSheetModal';
import useBookDetailActions from 'src/hooks/useBookDetailActions';
import profileImg from '@assets/images/blank_profile_picture.png';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'BookDetail'>;

const BookDetail: React.FC<PropsType> = ({ navigation, route }) => {
  const index: number = route.params?.id;
  const [product, setProduct] = useState<Content | null>(null);
  const { getProduct } = useBookAPI();
  const initialGetProduct = useCallback(async () => {
    const response = await getProduct(index);
    if (response.status === 200) {
      setProduct(response.data);
    } else {
      console.log("error :: ", response);
    }
  }, []);

  useEffect(() => {
    initialGetProduct();
  }, []);
  const onPressBack = () => {
    navigation.goBack();
  };
  const { isSelecting, onPressMore, onClose, actions } = useBookDetailActions();
  return (
    <SafeAreaView edges={['bottom']}>
      <View
        style={{
          height: 40,
          paddingHorizontal: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Pressable onPress={onPressBack}>
          <ChevronLeft style={{ color: '#48BA95', padding: 4 }} />
        </Pressable>
        <Pressable hitSlop={8} onPress={onPressMore}>
          <More style={{ color: '#48BA95', padding: 4 }} />
        </Pressable>
      </View>
      {product && (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: product.thumbnailImagePaths[0]}} />
        <View style={styles.userContainer}>
          <Image source={profileImg} style={styles.userImage} />
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.userName}
          >
            {product.seller.nickname}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.mainTitle}>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.title}>
              {product.title}
            </Text>
            <View style={styles.subTitle}>
              <Text style={styles.createdAt}>
                {getFormattedCreatedAt(product.createdAt)}
              </Text>
              <Text style={styles.wishCount}>
                {' '}
                • 관심 {product.wishes}
              </Text>
            </View>
          </View>
          <Text style={styles.text}>{product.description}</Text>
          <View style={styles.bottomContainer}>
            <Star style={styles.wishIcon} />
            <Text style={styles.price}>
              {product.price.toLocaleString()}원
            </Text>
          </View>
        </View>
      </View>
      )}
      <ActionSheetModal
        visible={isSelecting}
        actions={actions}
        onClose={onClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {},
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '45%',
  },
  userContainer: {
    height: 80,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    marginLeft: 12,
    fontSize: 16,
  },
  bodyContainer: {
    position: 'relative',
    marginTop: 16,
    height: '30%',
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  mainTitle: {
    paddingHorizontal: 16,
  },
  subTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 0,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  createdAt: {
    fontSize: 12,
    color: '#8E8E8E',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    height: 68,
    width: '100%',
    borderTopColor: '#efefef',
    borderTopWidth: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishIcon: {
    color: '#48BA95',
    marginHorizontal: 14,
  },
  wishCount: {
    fontSize: 12,
    color: '#8E8E8E',
    marginBottom: 10,
  },
});

export default BookDetail;

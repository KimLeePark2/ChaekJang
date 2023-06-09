import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChevronLeft from 'src/assets/svgs/chevron-left.svg';
import { getFormattedCreatedAt } from '@utils/format';
import type { Content } from 'src/@types/book';
import useBookAPI from '@hooks/useBookAPI';
import useUserAPI from '@hooks/useUserAPI';
import EmptyStar from '@assets/svgs/emptyStar.svg';
import FillStar from '@assets/svgs/fillStar.svg';
import More from '@assets/svgs/more-vertical.svg';
import ActionSheetModal from 'src/components/ActionSheetModal';
import useBookDetailActions from 'src/hooks/useBookDetailActions';
import profileImg from '@assets/images/blank_profile_picture.png';
import { IUser } from 'src/@types/user';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'BookDetail'>;

const BookDetail: React.FC<PropsType> = ({ navigation, route }) => {
  const productId: number = route.params?.id;
  const [product, setProduct] = useState<Content | null>(null);
  const [userInfo, setUserInfo] = useState<IUser>();
  const [status, setStatus] = useState(true);
  const [isWished, setIsWished] = useState({});
  const [wishes, setWishes] = useState(0);
  const { getProduct, wishClick, changeToSale, changeToSold } = useBookAPI();
  const { getUser } = useUserAPI();
  const initialGetProduct = async () => {
    try {
      const response = await getProduct(productId);
      if (response.status === 200) {
        setProduct(response.data);
        response.data.status === 'SALE' ? setStatus(true) : setStatus(false);
        setIsWished(response.data.isWished);
        setWishes(response.data.wishes);
      }
    } catch (e) {
      console.log('initial get product error :: ', e);
    }
  };
  const getUserInfo = async () => {
    try {
      const response = await getUser();
      if (response.status === 200) {
        setUserInfo(response.data);
      }
    } catch (e) {
      console.log('get user info error :: ', e);
    }
  };
  const onChangeStatus = async () => {
    try {
      const response = status
        ? await changeToSold(productId)
        : await changeToSale(productId);
      if (response.status === 200) {
        setStatus(!status);
      }
    } catch (e) {
      console.log('on change status error :: ', e);
    }
  };

  useLayoutEffect(() => {
    initialGetProduct().then();
    getUserInfo().then();
  }, []);

  const isMine: boolean = userInfo?.id === product?.seller.id;
  const onPressBack = () => {
    navigation.goBack();
  };
  const onPressWish = async () => {
    try {
      const response = await wishClick(productId);
      if (response.status === 200) {
        setIsWished(response.data);
        response.data
          ? setWishes(wishes => wishes + 1)
          : setWishes(wishes => wishes - 1);
      }
    } catch (e) {
      console.log('wish error :: ', e);
    }
  };
  const onPressBtn = () => {
    if (isMine) {
      onChangeStatus().then();
    }
  };
  const { isSelecting, onPressMore, onClose, actions } =
    useBookDetailActions(productId);
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
        {isMine && (
          <Pressable hitSlop={8} onPress={onPressMore}>
            <More style={{ color: '#48BA95', padding: 4 }} />
          </Pressable>
        )}
      </View>
      {product && (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: product.thumbnailImagePaths[0] }}
          />
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
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.title}
              >
                {product.title}
              </Text>
              <View style={styles.subTitle}>
                <Text style={styles.createdAt}>
                  {getFormattedCreatedAt(product.createdAt)}
                </Text>
                <Text style={styles.wishCount}> • 관심 {wishes}</Text>
              </View>
            </View>
            <Text style={styles.text}>{product.description}</Text>
            <View style={styles.bottomContainer}>
              <View style={styles.bottmLeft}>
                <Pressable onPress={onPressWish}>
                  {isWished ? (
                    <FillStar style={styles.wishIcon} />
                  ) : (
                    <EmptyStar style={styles.wishIcon} />
                  )}
                </Pressable>
                <Text style={styles.price}>
                  {product.price.toLocaleString()}원
                </Text>
              </View>
              <Pressable
                style={status ? styles.btnSale : styles.btnSold}
                onPress={onPressBtn}
              >
                {status ? (
                  <Text style={{ color: '#ffffff', fontWeight: '700' }}>
                    판매중
                  </Text>
                ) : (
                  <Text style={{ color: '#ffffff', fontWeight: '700' }}>
                    판매완료
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      )}
      <ActionSheetModal
        // data={productId}
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
    fontSize: 18,
  },
  bodyContainer: {
    position: 'relative',
    marginTop: 16,
    height: '30%',
  },
  text: {
    fontSize: 18,
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
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },
  createdAt: {
    fontSize: 14,
    color: '#8E8E8E',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
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
    justifyContent: 'space-between',
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
  bottmLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnSale: {
    marginRight: 16,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#48BA95',
  },
  btnSold: {
    marginRight: 16,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#dedede',
  },
});

export default BookDetail;

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Button,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { IBookItem, IUserInfo } from 'src/@types/book';
import { DUMMY } from 'src/components/Book/DUMMY';

type PropsType = NativeStackScreenProps<RootStackParamsType, 'BookDetail'>;

const BookDetail: React.FC<PropsType> = ({ navigation, route }) => {
  const data: IBookItem[] = DUMMY;
  const index: number = route.params?.id;
  // DUMMY.map((value: IBookItem, idx: number) => {
  //   if (value.id === route.params?.id) {
  //     index = idx;
  //   }
  // });
  const userInfo: IUserInfo = {
    id: 1,
    profileImage: require('./../../components/Book/example2.jpg'),
    nickname: '홍길동',
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView edges={['bottom']}>
      <View
        style={{
          height: 30,
          paddingHorizontal: 10,
        }}
      >
        <Pressable onPress={onPressBack}>
          <Text style={{ color: 'blue', fontSize: 24 }}>{'<'}</Text>
        </Pressable>
      </View>
      <View style={styles.container}>
        <Image style={styles.image} source={data[index]?.thumbnailImage} />
        <View style={styles.userContainer}>
          <Image source={userInfo.profileImage} style={styles.userImage} />
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={styles.userName}
          >
            {userInfo.nickname}
          </Text>
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.mainTitle}>
            <View style={styles.block}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.title}
              >
                {data[index]?.title}
              </Text>
              <Text style={styles.createdAt}>{data[index]?.createdAt}</Text>
            </View>
            <Button title="찜" onPress={() => Alert.alert('찜!')} />
          </View>
          <Text style={styles.price}>
            가격 : {data[index]?.price.toLocaleString()}원
          </Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.text}>
            ID is {route.params?.id}
          </Text>
        </View>
      </View>
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
    paddingHorizontal: 8,
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
    marginLeft: 8,
    fontSize: 16,
  },
  bodyContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
  },
  mainTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 16,
    marginBottom: 10,
  },
});

export default BookDetail;

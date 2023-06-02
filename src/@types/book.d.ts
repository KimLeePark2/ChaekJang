import { ImageSourcePropType } from 'react-native/types';

interface IBookItem {
  id: number;
  thumbnailImage: ImageSourcePropType;
  title: string;
  writer: string;
  price: number;
  wishCount: number;
  isSoldOut: boolean;
  createdAt: string;
}

interface IUserInfo {
  id: number;
  profileImage: ImageSourcePropType;
  nickname: string;
}

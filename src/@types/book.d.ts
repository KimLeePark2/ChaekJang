import { ImageSourcePropType } from 'react-native/types';

interface IBookItem {
  id: number;
  thumbnailImage: ImageSourcePropType;
  title: string;
  price: number;
  wishCount: number;
  isSoldOut: boolean;
  createdAt: string;
}

type onPressBookDetailType = {
  onPressBookDetail: (id: number) => void;
};

import type { Asset } from 'react-native-image-picker';

interface requestNewBookApiBody {
  userId: string;
  photo: Asset[];
  title: string;
  price: number;
  description: string;
}

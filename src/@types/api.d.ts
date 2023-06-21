import type { Asset } from 'react-native-image-picker';

interface requestNewBookApiBody {
  photo: Asset[];
  title: string;
  price: number;
  description: string;
}

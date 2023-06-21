import type { Asset } from 'react-native-image-picker';
import type { Content } from './book';

export interface requestNewBookApiData {
  photo: Asset[];
  title: string;
  price: number;
  description: string;
}

export interface responseProductsApi {
  contents: Content[];
  pageable: string;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

import type { IBookItem } from 'src/@types/book';

export const DUMMY: IBookItem[] = [
  {
    id: 0,
    thumbnailImage: require('./example1.jpeg'),
    title: '나의 첫 국어사전',
    price: 2000,
    wishCount: 3,
    isSoldOut: false,
    createdAt: '2022-05-25T03:24:00',
  },
  {
    id: 1,
    thumbnailImage: require('./example2.jpg'),
    title: 'Duo 3.10 영단어',
    price: 45000,
    wishCount: 0,
    isSoldOut: true,
    createdAt: '2022-06-23T11:11:00',
  },
  {
    id: 2,
    thumbnailImage: require('./example3.jpeg'),
    title: '서로 생긴 모습은 달라도 우린 모두 친구',
    price: 87200,
    wishCount: 7,
    isSoldOut: false,
    createdAt: '2023-05-19T03:24:00',
  },
  {
    id: 3,
    thumbnailImage: require('./example4.jpg'),
    title: '이기적 워드프로세서 실기',
    price: 999000,
    wishCount: 123,
    isSoldOut: true,
    createdAt: '2023-05-19T23:43:00',
  },
  {
    id: 4,
    thumbnailImage: require('./example5.jpg'),
    title: '봉제인형 살인사건',
    price: 9999000,
    wishCount: 9999,
    isSoldOut: false,
    createdAt: '2023-05-20T23:43:07',
  },
];

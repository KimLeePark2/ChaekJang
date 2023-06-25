export interface Content {
  id: number;
  title: string;
  description: string;
  status: 'SALE' | 'SOLD' | 'RESERVED';
  price: number;
  isWished: boolean;
  thumbnailImagePaths: string[];
  seller: {
    id: string;
    name: string;
    nickname: string;
  };
  wishes: number;
  createdAt: string;
}

export interface IUserInfo {
  id: number;
  nickname: string;
}

// DUMMY 데이터용
// -> 현재 BookList, BookItem에서 사용하지 않으므로 BookList를 사용하는 페이지 및 컴포넌트에서 수정 필요
// -> 완전히 미사용시 코드 제거 예정
export interface IBookItem {
  id: number;
  thumbnailImagePaths: string;
  title: string;
  writer: string;
  price: number;
  wishCount: number;
  isSoldOut: boolean;
  createdAt: string;
}

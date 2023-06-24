type RootStackParamsType = {
  MainTab: MainTabParamsType;
  SignIn: undefined;
  BookRegister: undefined;
  BookDetail: { id: number };
  NewBook: undefined;
};

type MainTabParamsType = {
  HomeStack: HomeStackParamsType;
  SearchStack: SearchStackParamsType;
  MyPageStack: MyPageStackParamsType;
};

type HomeStackParamsType = {
  Home: undefined;
};

type SearchStackParamsType = {
  Search: undefined;
  SearchResult: { inputValue: string };
};

type MyPageStackParamsType = {
  Profile: undefined;
  SalesHistory: { userId: string };
  PurchaseHistory: undefined;
  WishList: { userId: string };
};

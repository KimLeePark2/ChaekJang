type RootStackParamsType = {
  MainTab: MainTabParamsType;
  SignIn: undefined;
  BookRegister: undefined;
  BookDetail: { id: number };
};

type MainTabParamsType = {
  HomeStack: HomeStackParamsType;
  SearchStack: SearchStackParamsType;
  ChatStack: undefined;
  MyPageStack: MyPageStackParamsType;
};

type HomeStackParamsType = {
  Home: undefined;
};

type SearchStackParamsType = {
  Search: undefined;
  SearchResult: { inputValue: string };
};

type ChatStackParamsType = {
  Chat: undefined;
  ChatDetail: undefined;
};

type MyPageStackParamsType = {
  Profile: undefined;
  SalesHistory: undefined;
  PurchaseHistory: undefined;
  WishList: undefined;
};

import BookList from '@components/Book/BookList';
import MainHeader from '@components/Header/MainHeader';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

const Search = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<SearchStackParamsType & RootStackParamsType>
    >();
  const [inputValue, setInputValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');

  const onSubmit = () => {
    // navigation.navigate('SearchResult', { inputValue });
    setSearchValue(inputValue);
  };

  const SEARCH_WORDS = ['갤럭시', '아이폰', '맥북'];
  const _defaultPage = () => {
    return (
      <View style={{ flex: 1, gap: 8 }}>
        <Text style={{ fontWeight: '700', fontSize: 14 }}>최근 검색어</Text>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          {SEARCH_WORDS.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: '45%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: '#cccccc',
                  paddingHorizontal: 2,
                  paddingVertical: 4,
                }}
              >
                <Text>{item}</Text>
                <Text>X</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const _searchPage = () => {
    return (
      <View style={{ flex: 1 }}>
        <BookList />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MainHeader>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="검색어를 입력하세요"
            placeholderTextColor={'#888'}
            style={{
              borderRadius: 8,
              backgroundColor: '#ececec',
              width: '70%',
              paddingHorizontal: 8,
              paddingVertical: 4,
              fontSize: 12,
            }}
          />
          {inputValue && (
            <TouchableOpacity
              onPress={() => {
                setInputValue('');
                setSearchValue('');
              }}
              style={{ position: 'absolute', right: '33%' }}
            >
              <Text>X</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onSubmit}>
            <Text>검색</Text>
          </TouchableOpacity>
        </View>
      </MainHeader>
      <View style={{ paddingHorizontal: 14, paddingVertical: 10, flex: 1 }}>
        {!searchValue ? _defaultPage() : _searchPage()}
      </View>
    </View>
  );
};

export default Search;

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
import XIcon from 'src/assets/svgs/x.svg';

const SEARCH_WORDS = ['갤럭시', '아이폰', '맥북'];
const Search = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<SearchStackParamsType & RootStackParamsType>
    >();
  const [inputValue, setInputValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [words, setWords] = React.useState(SEARCH_WORDS);

  const onSubmit = () => {
    // navigation.navigate('SearchResult', { inputValue });
    if (!inputValue) {
      return;
    }
    setSearchValue(inputValue);
    if (!words.some(item => item === inputValue)) {
      setWords(prev => {
        return [inputValue, ...prev];
      });
    }
  };

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
          {words.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '45%',
                  borderBottomWidth: 1,
                  borderColor: '#cccccc',
                  paddingHorizontal: 2,
                  paddingVertical: 4,
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setInputValue(item);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const newWords = words.filter((_, idx) => {
                      return idx !== index;
                    });
                    setWords(newWords);
                  }}
                >
                  <XIcon style={{ color: '#48BA95' }} />
                </TouchableOpacity>
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
        <BookList searchValue={searchValue} />
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MainHeader>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '95%',
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
                width: '86%',
                paddingHorizontal: 8,
                paddingVertical: 10,
                fontSize: 12,
              }}
            />
            <View>
              {inputValue && (
                <TouchableOpacity
                  onPress={() => {
                    setInputValue('');
                    setSearchValue('');
                  }}
                >
                  <XIcon
                    style={{
                      color: '#48BA95',
                      right: 10,
                      bottom: -12,
                      position: 'absolute',
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={onSubmit}
              style={{
                backgroundColor: '#48BA95',
                borderRadius: 4,
                padding: 8,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>검색</Text>
            </TouchableOpacity>
          </View>
        </View>
      </MainHeader>
      <View style={{ paddingHorizontal: 14, paddingVertical: 10, flex: 1 }}>
        {!searchValue ? _defaultPage() : _searchPage()}
      </View>
    </View>
  );
};

export default Search;

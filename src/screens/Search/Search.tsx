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
  const [isSearch, setIsSearch] = React.useState(false);
  const [searchWords, setSearchWords] = React.useState(SEARCH_WORDS);
  const [replaceInputValue, setReplaceInputValue] = React.useState(
    inputValue?.replace(/ /g, ''),
  );

  const resetSearchWords = () => {
    setSearchWords([]);
  };

  React.useEffect(() => {
    setReplaceInputValue(inputValue?.replace(/ /g, ''));
  }, [inputValue]);

  const onSubmit = () => {
    // navigation.navigate('SearchResult', { inputValue });
    console.log(replaceInputValue);
    if (!replaceInputValue) {
      return;
    }

    if (!searchWords.some(item => item === inputValue)) {
      setSearchWords(prev => {
        return [inputValue.trim(), ...prev];
      });
    }
    setIsSearch(true);
  };

  const _defaultPage = () => {
    return (
      <View style={{ flex: 1, gap: 8 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '95%',
          }}
        >
          <Text style={{ fontWeight: '700', fontSize: 16 }}>최근 검색어</Text>
          <TouchableOpacity
            onPress={resetSearchWords}
            style={{ justifyContent: 'flex-end' }}
          >
            <Text style={{ color: 'grey', fontSize: 12 }}>검색기록 삭제</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 10,
          }}
        >
          {searchWords.map((item, index) => {
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
                    const newWords = searchWords.filter((_, idx) => {
                      return idx !== index;
                    });
                    setSearchWords(newWords);
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
        <BookList searchValue={replaceInputValue} />
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
                    setIsSearch(false);
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
        {!isSearch ? _defaultPage() : _searchPage()}
      </View>
    </View>
  );
};

export default Search;

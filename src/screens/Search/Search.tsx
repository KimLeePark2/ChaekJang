import BookList from '@components/Book/BookList';
import MainHeader from '@components/Header/MainHeader';
import useBookAPI from '@hooks/useBookAPI';
import AsyncStorage from '@react-native-community/async-storage';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Content } from 'src/@types/book';
import XIcon from 'src/assets/svgs/x.svg';
import NotFound from '@screens/Search/NotFound';

const SEARCH_WORDS = ['갤럭시', '아이폰', '맥북'];
const Search = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [searchWords, setSearchWords] = React.useState(SEARCH_WORDS);
  const [replaceInputValue, setReplaceInputValue] = React.useState(
    inputValue?.replace(/ /g, ''),
  );
  const [bookListData, setBookListData] = useState<Content[] | null>(null);
  const [filteredData, setFilteredData] = useState<Content[] | null>(null);
  const { getProducts } = useBookAPI();

  const getBookList = async () => {
    try {
      const response = await getProducts(1);
      const { status, data } = response;
      if (status === 200) {
        console.log(data);
        setBookListData(data.content);
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        const { status: code } = e.response;
        console.log(code, 'axios error');
      } else {
        console.log('알 수 없는 error');
      }
    }
  };

  React.useLayoutEffect(() => {
    getBookList().then();
  }, []);

  React.useEffect(() => {
    console.log(bookListData, 'booklist data');
  }, [bookListData]);

  React.useEffect(() => {
    const replaceSearchValue = searchValue?.replace(/ /g, '').toLowerCase();
    if (replaceSearchValue && bookListData) {
      const filteredData = bookListData.filter(
        item =>
          item.title
            .replace(/ /g, '')
            .toLowerCase()
            .includes(replaceSearchValue) ||
          item.description
            .replace(/ /g, '')
            .toLowerCase()
            .includes(replaceSearchValue),
      );
      setFilteredData(filteredData);
    } else {
      setFilteredData(null);
    }
  }, [searchValue, bookListData]);

  React.useEffect(() => {
    _retrieveData().then();
  }, []);

  const resetSearchWords = () => {
    setSearchWords([]);
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('searchWords');
      if (value !== null) {
        // We have data!!
        setSearchWords(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const _storeData = async (words: string[]) => {
    try {
      await AsyncStorage.setItem('searchWords', JSON.stringify(words));
    } catch (error) {
      // Error saving data
      console.log(error, 'error hi');
    }
  };

  React.useEffect(() => {
    setReplaceInputValue(inputValue?.replace(/ /g, ''));
  }, [inputValue]);

  const onSubmit = () => {
    // navigation.navigate('NotFound', { inputValue });
    if (!replaceInputValue) {
      return;
    }

    if (!searchWords.some(item => item === inputValue)) {
      setSearchWords(prev => {
        const newSearchWords = [inputValue.trim(), ...prev];
        _storeData(newSearchWords).then();
        return newSearchWords;
      });
    }
    setSearchValue(replaceInputValue);
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
          {searchWords?.map((item, index) => {
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
                  <Text style={{ width: 100 }}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const newWords = searchWords.filter((_, idx) => {
                      return idx !== index;
                    });
                    _storeData(newWords).then();
                    setSearchWords(newWords);
                  }}
                >
                  <XIcon style={{ color: '#acacac' }} width={20} />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };
  const _searchPage = () => {
    if (!filteredData) {
      return <NotFound />;
    }
    return (
      <View style={{ flex: 1 }}>
        <BookList data={filteredData} />
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
            width: '95%',
            gap: 4,
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
                    color: '#acacac',
                    right: 10,
                    bottom: -12,
                    position: 'absolute',
                  }}
                  width={20}
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
      </MainHeader>
      <View style={{ paddingHorizontal: 14, paddingVertical: 10, flex: 1 }}>
        {!searchValue ? _defaultPage() : _searchPage()}
      </View>
    </View>
  );
};

export default Search;

import BookList from '@components/Book/BookList';
import MainHeader from '@components/Header/MainHeader';
import { colors } from '@styles/colors';

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import XIcon from 'src/assets/svgs/x.svg';
import AsyncStorage from '@react-native-community/async-storage';

const Search = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [words, setWords] = React.useState<string[]>([]);

  const onSubmit = () => {
    setSearchValue(inputValue);
    setWords(prev => {
      const newWords = [inputValue, ...prev];
      _storeData(newWords);
      return newWords;
    });
  };
  const _defaultPage = () => {
    return (
      <View style={{ flex: 1, gap: 8 }}>
        <Text style={{ fontWeight: '700', fontSize: 14, color: colors.black }}>
          최근 검색어
        </Text>
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
                  <Text style={{ color: colors.black }}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const newWords = words.filter((_, idx) => {
                      return idx !== index;
                    });
                    setWords(newWords);
                  }}
                >
                  <XIcon style={{ color: '#aaa' }} width={14} />
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
        <BookList />
      </View>
    );
  };

  React.useEffect(() => {
    _retrieveData().then(item => setWords(item));
  }, []);

  const _storeData = async (newWords: string[]) => {
    try {
      await AsyncStorage.setItem('words', JSON.stringify(newWords));
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('words');
      if (value !== null) {
        // We have data!!
        console.log(JSON.parse(value));
        return JSON.parse(value);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
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
              placeholderTextColor="#888"
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
                      color: colors.lightGrey,
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
        </View>
      </MainHeader>
      <View style={{ paddingHorizontal: 14, paddingVertical: 10, flex: 1 }}>
        {!searchValue ? _defaultPage() : _searchPage()}
      </View>
    </View>
  );
};

export default Search;

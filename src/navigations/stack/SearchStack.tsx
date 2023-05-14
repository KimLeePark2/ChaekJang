import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Search from 'src/screens/Search/Search';
import SearchResult from 'src/screens/Search/SearchResult';

const Stack = createNativeStackNavigator<SearchStackParamsType>();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;

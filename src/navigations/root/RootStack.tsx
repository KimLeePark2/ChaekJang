import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from '@navigations/main/MainTab';
import BookDetail from '@screens/Book/BookDetail';
import NewBook from '@screens/Book/NewBook';
import Login from '@screens/Auth/Login';

const Stack = createNativeStackNavigator<RootStackParamsType>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewBook"
        component={NewBook}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;

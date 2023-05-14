import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from 'src/navigations/main/MainTab';
import SignIn from 'src/screens/Auth/SignIn';
import BookDetail from 'src/screens/Book/BookDetail';

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
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;

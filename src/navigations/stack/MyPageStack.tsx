import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from 'src/screens/MyPage/Profile';
import SalesHistory from '@screens/MyPage/SalesHistory';
import WishList from '@screens/MyPage/WishList';

const Stack = createNativeStackNavigator<MyPageStackParamsType>();

const MyPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SalesHistory"
        component={SalesHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WishList"
        component={WishList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyPageStack;

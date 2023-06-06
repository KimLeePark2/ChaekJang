import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from 'src/screens/MyPage/Profile';
import SalesHistory from '@screens/MyPage/SalesHistory';
import WishHistory from '@screens/MyPage/WishHistory';

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
        name="WishHistory"
        component={WishHistory}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyPageStack;

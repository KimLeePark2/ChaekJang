import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from 'src/screens/MyPage/Profile';

const Stack = createNativeStackNavigator<MyPageStackParamsType>();

const MyPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyPageStack;

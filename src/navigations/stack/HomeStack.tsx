import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from 'src/screens/Home/Home';

const Stack = createNativeStackNavigator<HomeStackParamsType>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTab from 'src/navigations/MainTab';

const Stack = createNativeStackNavigator<RootStackParamsType>();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;

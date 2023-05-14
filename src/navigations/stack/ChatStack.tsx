import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from 'src/screens/Chat/Chat';
import ChatDetail from 'src/screens/Chat/ChatDetail';

const Stack = createNativeStackNavigator<ChatStackParamsType>();

const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;

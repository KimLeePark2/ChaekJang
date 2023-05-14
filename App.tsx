import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainHeader from 'src/components/Header/CustomStatusBar';
import RootStack from 'src/navigations/RootStack';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainHeader />
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

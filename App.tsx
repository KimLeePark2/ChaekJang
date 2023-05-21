import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainHeader from '@components/Header/CustomStatusBar';
import RootStack from '@navigations/root/RootStack';
import { colors } from '@styles/colors';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';

const CustomTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.white },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer theme={CustomTheme}>
          <MainHeader />
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;

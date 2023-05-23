import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainHeader from '@components/Header/CustomStatusBar';
import RootStack from '@navigations/root/RootStack';
import { colors } from '@styles/colors';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import { Provider as JotaiProvider } from 'jotai';

const CustomTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.white },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <JotaiProvider>
        <SafeAreaProvider>
          <NavigationContainer theme={CustomTheme}>
            <MainHeader />
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </JotaiProvider>
    </ThemeProvider>
  );
};

export default App;

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainHeader from '@components/Header/CustomStatusBar';
import RootStack from '@navigations/root/RootStack';
import { colors } from '@styles/colors';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import { Provider as JotaiProvider } from 'jotai';

import { NativeModules, Platform, Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const CustomTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.white },
};

const App = () => {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('[FCM Token] ', fcmToken);
  };
  React.useEffect(() => {
    getFcmToken().then();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const notification = remoteMessage?.notification;
      if (notification) {
        console.log(notification.title, notification.body, 'message');
      }
    });
    return () => unsubscribe();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      if (!authStatus) {
        if (Platform.OS === 'ios') {
          Linking.openURL('App-Prefs:root').then();
        } else if (NativeModules.OpenExternalURLModule) {
          NativeModules.OpenExternalURLModule.linkAndroidSettings();
        }
      }
    }

    if (authStatus) {
      console.log('이 곳은 승인 상태일 때에만 타게 됩니다.');
    }
  }

  React.useEffect(() => {
    requestUserPermission().then();
  }, []);
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

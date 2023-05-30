import SearchStack from '@navigations/stack/SearchStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import HomeStack from 'src/navigations/stack/HomeStack';
import MyPageStack from 'src/navigations/stack/MyPageStack';
import HomeIcon from 'src/assets/svgs/home.svg'
import SearchIcon from 'src/assets/svgs/search.svg'
import MyPageIcon from 'src/assets/svgs/gitlab.svg'

const Tab = createBottomTabNavigator<MainTabParamsType>();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#403321', paddingTop: 4},
        headerShown: false,
        tabBarActiveTintColor: '#F0CA6D',
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <HomeIcon style={{color}} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <SearchIcon style={{color}} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPageStack"
        component={MyPageStack}
        options={{
          tabBarLabel: 'MyPage',
          tabBarIcon: ({ color }) => <MyPageIcon style={{color}} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

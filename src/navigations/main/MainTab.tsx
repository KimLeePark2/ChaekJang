import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import HomeStack from 'src/navigations/stack/HomeStack';
import MyPageStack from 'src/navigations/stack/MyPageStack';
import Search from 'src/screens/Search/Search';

const Tab = createBottomTabNavigator<MainTabParamsType>();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#6200ee',
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>Home</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>Search</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPageStack"
        component={MyPageStack}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>MyPage</Text>,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

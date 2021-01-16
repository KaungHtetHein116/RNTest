import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeStackNavigator,
  HistoryStackNavigator,
  SettingStackNavigator,
} from './StackNavigator';
import TabBar from './components/TabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeStackNavigator}
        initialParams={{icon: 'home'}}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryStackNavigator}
        initialParams={{icon: 'history'}}
      />
      <Tab.Screen
        name="SettingScreen"
        component={SettingStackNavigator}
        initialParams={{icon: 'account-cog-outline'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

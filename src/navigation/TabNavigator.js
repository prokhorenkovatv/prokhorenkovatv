import React from 'react';
import { createMaterialBottomTabNavigator }
  from '@react-navigation/material-bottom-tabs';
import 'react-native-gesture-handler';
import { THEME } from 'styles/theme';
import { StyleSheet, Platform } from 'react-native';
import Icon from 'components/Icon';
import { PostNavigator, BookedNavigator } from 'navigation/StackNavigators';

const Tab = createMaterialBottomTabNavigator();

const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: (({ focused }) => {
        let iconName = {
          'All': 'icon-list',
          'Bookmarked': 'icon-star'
        };
        return (
          <Icon
            name={iconName[route.name]}
            style={focused ? styles.iconActiveTabs : styles.iconTabs}
          />
        )
      })
    })}
    shifting
    tabBarOptions={{
      activeTintColor: THEME.MAIN_COLOR,
      inactiveTintColor: THEME.GREY
    }}
    barStyle={{
      backgroundColor: THEME.MAIN_COLOR
    }}
  >
    <Tab.Screen name="All">{PostNavigator}</Tab.Screen>
    <Tab.Screen name="Bookmarked">{BookedNavigator}</Tab.Screen>
  </Tab.Navigator>
);

export default HomeTabNavigator;

const styles = StyleSheet.create({
  iconActiveTabs: {
    fontSize: 24,
    color: Platform.OS === 'android' ? "#fff" : THEME.MAIN_COLOR
  },
  iconTabs: {
    fontSize: 24,
    color: THEME.GREY
  }
})
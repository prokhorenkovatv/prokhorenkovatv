import React from 'react';
import { createMaterialBottomTabNavigator }
  from '@react-navigation/material-bottom-tabs';
import 'react-native-gesture-handler';
import { StyleSheet, Platform } from 'react-native';
import Icon from 'components/Icon';
import { PostNavigator, BookedNavigator } from 'navigation/StackNavigators';
import Animated from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
const Tab = createMaterialBottomTabNavigator();

const HomeTabNavigator = ({ style }) => {
  const theme = useTheme();
  return (
    <Animated.View style={[styles.stack, style]}>
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
                style={focused
                  ? [styles.iconActiveTabs, {
                    color:
                      Platform.OS === 'android'
                        ? "#fff"
                        : theme.colors.primary
                  }]
                  : [styles.iconTabs, { color: "#fff" }]}
              />
            )
          })
        })}
        shifting
        tabBarOptions={{
          activeTintColor: theme.colors.primary,
          inactiveTintColor: theme.colors.card
        }}
        barStyle={{
          backgroundColor: theme.colors.primary
        }}
      >
        <Tab.Screen name="All">{PostNavigator}</Tab.Screen>
        <Tab.Screen name="Bookmarked">{BookedNavigator}</Tab.Screen>
      </Tab.Navigator>
    </Animated.View>
  )
};

export default HomeTabNavigator;

const styles = StyleSheet.create({
  iconActiveTabs: {
    fontSize: 24,
  },
  iconTabs: {
    fontSize: 24
  },
  stack: {
    flex: 1,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5
  }
})
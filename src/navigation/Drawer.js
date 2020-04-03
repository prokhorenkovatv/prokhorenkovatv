import React from 'react';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { THEME } from 'styles/theme';
import HomeTabNavigator from 'navigation/TabNavigator';
import {
  AboutNavigator,
  CreateNavigator
} from 'navigation/StackNavigators';

const Drawer = createDrawerNavigator();
export default () => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={{ width: '50%', backgroundColor: 'transparent' }}
      drawerContentOptions={
        {
          activeBackgroundColor: 'transparent',
          activeTintColor: THEME.MAIN_COLOR,
          inactiveTintColor: THEME.MAIN_COLOR,
          labelStyle: {
            fontFamily: 'OpenSans-Bold'
          }
        }}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />
      <Drawer.Screen name="About" component={AboutNavigator} />
      <Drawer.Screen name="New Post" component={CreateNavigator} />
    </Drawer.Navigator >
  );
};
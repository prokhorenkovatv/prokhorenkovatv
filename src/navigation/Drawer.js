import React, { useState } from 'react';
import {
  createDrawerNavigator
} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import HomeTabNavigator from 'navigation/TabNavigator';
import {
  AboutNavigator,
  CreateNavigator
} from 'navigation/StackNavigators';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import DrawerContent from 'navigation/DrawerContent';
import { useTheme } from 'react-native-paper';

const Drawer = createDrawerNavigator();

export default ({ toggleTheme }) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };
  const theme = useTheme();
  return (
    <Drawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={[styles.drawerStyles, { backgroundColor: theme.colors.border }]}
      drawerContentOptions={
        {
          activeBackgroundColor: 'transparent',
          activeTintColor: theme.colors.text,
          inactiveTintColor: theme.colors.text,
          labelStyle: {
            fontFamily: 'OpenSans-Bold'
          }
        }}
      sceneContainerStyle={{ backgroundColor: theme.colors.border }}
      drawerContent={props => {
        setProgress(props.progress);
        return <DrawerContent {...props} toggleTheme={toggleTheme} />
      }}
    >
      <Drawer.Screen name="Home">
        {props => <HomeTabNavigator {...props} style={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="About">
        {props => <AboutNavigator {...props} style={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="New Post">
        {props => <CreateNavigator {...props} style={animatedStyle} />}
      </Drawer.Screen>
    </Drawer.Navigator >

  );
};

const styles = StyleSheet.create({
  drawerStyles: { flex: 1, width: '50%' }
});
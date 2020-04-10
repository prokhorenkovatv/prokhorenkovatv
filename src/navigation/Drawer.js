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
import LinearGradient from 'react-native-linear-gradient';
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
    <LinearGradient
      colors={[theme.colors.border, theme.colors.gradient]}
      style={{ flex: 1 }}
    >
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={[styles.drawerStyles, { backgroundColor: 'transparent' }]}
        drawerContentOptions={
          {
            activeBackgroundColor: 'transparent',
            activeTintColor: theme.colors.text,
            inactiveTintColor: theme.colors.text,
            labelStyle: {
              fontFamily: 'OpenSans-Bold'
            }
          }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
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
    </LinearGradient>


  );
};

const styles = StyleSheet.create({
  drawerStyles: { flex: 1, width: '50%' }
});
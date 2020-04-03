import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Drawer from 'navigation/Drawer';

const AppNavigation = () => {
  return (
    <NavigationContainer >
      <Drawer />
    </NavigationContainer>
  );
};

export default AppNavigation;
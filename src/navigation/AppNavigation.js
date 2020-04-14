import React, { useEffect, useState } from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import Drawer from 'navigation/Drawer';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { AppDefaultTheme, AppDarkTheme } from 'styles/theme';
import { navigationRef, isMountedRef } from './RootNavigation';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  ...AppDefaultTheme
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  ...AppDarkTheme
};

const AppNavigation = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;
  const toggleTheme = async () => setIsDarkTheme(isDark => !isDark);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer
        ref={navigationRef}
        theme={theme}
      >
        <Drawer toggleTheme={toggleTheme} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigation;
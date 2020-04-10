import * as React from 'react';
import SplashScreen from 'react-native-splash-screen';
export const isMountedRef = React.createRef();
export const navigationRef = React.createRef();

export function navigate(name, params) {
  if (isMountedRef.current && navigationRef.current) {
    SplashScreen.hide();
    navigationRef.current.navigate(name, params);
  } else {
    SplashScreen.show();
  }
}
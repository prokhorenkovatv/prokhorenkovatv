import React, { useEffect } from 'react';
import AppNavigation from 'navigation/AppNavigation';
import { store, persistor } from 'state/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PostDB } from 'database/db';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    PostDB.init();
    // SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  )
};

export default App;

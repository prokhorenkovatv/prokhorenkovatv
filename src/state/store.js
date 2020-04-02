import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from '@react-native-community/async-storage';
import rootReducer from 'state/rootReducer';

const persistConfig = {
  key: 'root',
  whitelist: [],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewareComposer = (
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

export const store = createStore(
  persistedReducer,
  middlewareComposer(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);

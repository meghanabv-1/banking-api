import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistConfig from './persistConfig';

const persistedReducer = persistReducer(persistConfig(storage), rootReducer);

export default function configureStore(initialState) {
  const store = createStore(persistedReducer, initialState, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return { store, persistor };
}

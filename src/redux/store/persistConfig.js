const persistConfig = storage => ({
  key: 'root',
  storage,
  whitelist: ['user']
});

export default persistConfig;